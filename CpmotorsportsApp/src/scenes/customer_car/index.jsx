import { Box, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../components/alert.jsx";
import MaterialTable from '@material-table/core';
import { tableIcons } from "../global/tableicons";
import AddCustomerCar from "./addcustomer_car";

const Car = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Car
  const [openadd, setOpenadd] = useState(false);
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add Car component
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/cars", values)
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Make
  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/cars", values)
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  /* Definitions for Delete Customer
  const [postsucessfuldelete, setPostsucessfuldelete] = useState(false);
  const handleFormSubmitdelete = (values) => {
    const idtodelete = values.trans_id;
    client
      .delete(`/Projects/${idtodelete}`)
      .then(setOpendelete(false))
      .then(setReRender(true))
      .then(setPostsucessfuldelete(true));
  }; */

  // Api Call and config
  const [Car, setCar] = useState([]);
  useEffect(() => {
    client
      .get("/cars")
      .then((res) => {
        setCar(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [customer_data, set_customerdata] = useState([]);

  // Api call to get make status for select option
  useEffect(() => {
    client
      .get("/customer_id")
      .then((res) => {
        set_customerdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Api call and config for Categories and Transaction Accounts
  const [make_data, set_makedata] = useState([]);

  // Api call to get make status for select option
  useEffect(() => {
    client
      .get("/make")
      .then((res) => {
        set_makedata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   // Api call and config for Categories and Transaction Accounts
   const [model_data, set_modeldata] = useState([]);

   // Api call to get Model Names for select option
   useEffect(() => {
     client
       .get("/model")
       .then((res) => {
         set_modeldata(res.data);
       })
       .catch((err) => {
         console.log(err);
       });
   }, []);


  // Api call and config for Categories and Transaction Accounts
  const [ownership_statusdata, setownership_statusdata] = useState([]);

  // Api call to get make status for select option
  useEffect(() => {
    client
      .get("/ownership_status")
      .then((res) => {
        setownership_statusdata(res.data);
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

  // Edit Customer Capabilities
  const CustomerOptions = customer_data.map((customer) => (
    <MenuItem value={customer.customer_id}>
      ({customer.customer_id}) {customer.Customer}
    </MenuItem>
  ));

   // Edit Make Capabilities
   const MakeOptions = make_data.map((make) => (
    <MenuItem value={make.make_id}>
      {make.make_name}
    </MenuItem>
  ));

  // Edit Model Capabilities
  const ModelOptions = model_data.map((model) => (
    <MenuItem value={model.model_id}>
      ({model.make_name}) {model.model_name} {model.prod_year}
    </MenuItem>
  ));

  // Edit Ownership StatusCapabilities
  const OwnershipStatusOptions = ownership_statusdata.map((ownership_status) => (
    <MenuItem value={ownership_status.ownership_stat_id}>
      {ownership_status.ownership_stat_name}
    </MenuItem>
  ));

  // Column Configuration
  const columns = [
    { field: "vin_num", title: "VIN No.", flex: 0.5 },
    {
      field: "Customer",
      title: "Customer",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {CustomerOptions}
        </Select>
      ),
    },
    {
      field: "make_name",
      title: "Make",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {MakeOptions}
        </Select>
      ),
    },
    {
      field: "model_name",
      title: "Model",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ModelOptions}
        </Select>
      ),
    },
    { field: "color", title: "Color", flex: 1 },
    {
      field: "ownership_stat_name",
      title: "Ownership Status",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {OwnershipStatusOptions}
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
      <AddCustomerCar
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        customerdata={customer_data}
        makedata={make_data}
        modeldata={model_data}
        ownershipstatusdata={ownership_statusdata}
        alert={SuccessAlert}
      />
      <Header title="Customer Cars" subtitle="List of all Customer Cars" />
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
          title="Customer Car Data"
          data={Car}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(newRow);
                  handleFormSubmitadd(newRow);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                const updatedRows = [...data];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                  setData(updatedRows);
                  resolve();
                }, 2000);
              }),
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
              backgroundColor: "white",
              color: "black",
            },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "Car"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "Car"),
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
export default Car;
