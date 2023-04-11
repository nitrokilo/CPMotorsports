import { Box, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../components/alert.jsx";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { tableIcons } from "../global/tableicons";
import AddCustomer from "./addcustomer";
import { Link } from "react-router-dom";
import MyButton from "../global/buttonstyles";
import ButtonGroup from '@mui/material/ButtonGroup';

const Customer = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Customer
  const [openadd, setOpenadd] = useState(false);
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add Customer component
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/customer", values)
      .then(setOpenadd(false))
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Customer
  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/customer", values)
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  // Definitions for Delete Customer
  const [postsucessfuldelete, setPostsucessfuldelete] = useState(false);
  const handleFormSubmitdelete = (values) => {
    const idtodelete = values.trans_id;
    client
      .delete(`/Projects/${idtodelete}`)
      .then(setOpendelete(false))
      .then(setReRender(true))
      .then(setPostsucessfuldelete(true));
  };

  // Api Call and config
  const [Customer, setCustomer] = useState([]);
  useEffect(() => {
    client
      .get("/customer")
      .then((res) => {
        setCustomer(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [customer_status_data, setcustomer_status_data] = useState([]);

  // Api call to get customer status for select option
  useEffect(() => {
    client
      .get("/customer_status")
      .then((res) => {
        setcustomer_status_data(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Edit Capabilities
  const customerstatusoptions = customer_status_data.map((customer_status) => (
    <MenuItem value={customer_status.customer_stat_id}>
      {customer_status.customer_stat_name}
    </MenuItem>
  ));

  // Column Configuration
  const columns = [
    { field: "customer_id", title: "ID", flex: 0.5, editable: false, width:5 },
    { field: "customer_first_name", title: "First Name", flex: 1 },
    { field: "customer_last_name", title: "Last Name", flex: 1 },

    {
      field: "customer_phone_number",
      title: "Phone Number",
      width: 1000
    },

    {
      field: "customer_email",
      title: "Customer Email",
      width: 250,
      
    },
    {
      field: "customer_stat_name",
      title: "Customer Status",
      width: 100,
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {customerstatusoptions}
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Customer" subtitle="List of all Customers" />
      
      <ButtonGroup variant="contained" >
      <AddCustomer
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        customerstatusdata={customer_status_data}
        alert={SuccessAlert}
      />
      <br/>
      <Link to="/customer_cars">
        <MyButton text="Add a Car to Customer"></MyButton>
      </Link>
      <br/>
      <Link to="/projects">
        <MyButton text="Add a Project"></MyButton>
      </Link>
    </ButtonGroup>
  
      

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <MaterialTable
          icons={tableIcons}
          title=""
          data={Customer}
          columns={columns}
          style={{ backgroundColor: colors.primary[400], "padding-right": "90px"} }
          editable={{
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  handleFormSubmitedit(updatedRow);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            headerStyle: {
              fontWeight: "bold",
              fontSize: 18,
              backgroundColor: colors.primary[500],
            },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "Customer"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "Customer"),
              },
            ],
            filtering: true,
            pageSize: 15,
          }}
        />
      </Box>
    </Box>
  );
};

export default Customer;
