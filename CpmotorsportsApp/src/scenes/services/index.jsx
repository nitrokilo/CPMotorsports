import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../components/alert.jsx";
import AddService from "./addservice";
const Service = () => {
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
      .post("/service", values)
      .then(setOpenadd(false))
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Customer
  const [openedit, setOpenedit] = useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/service", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  // Api Call and config
  const [Service, setService] = useState("");
  useEffect(() => {
    client
      .get("/service")
      .then((res) => {
        setService(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [service_status_data, setservice_statusdata] = useState([]);

  // Api call to get service status for select option
  useEffect(() => {
    client
      .get("/service_type_status")
      .then((res) => {
        setservice_statusdata(res.data);
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

  // Column Configuration
  const columns = [
    { 
      field: "service_id",
      headerName: "ID",
      flex: 0.5 
    },

    { 
      field: "service_name",
      headerName: "Service Name", 
      flex: 1 
    },

    { 
      field: "service_desc",
      headerName: "Service Description",
      flex: 1 
    },

    {
      field: "service_cost",
      headerName: "Service Cost",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "customer_email",
      headerName: "Customer Email",
      flex: 1,
    },
    {
      field: "serv_type_stat_id",
      headerName: "Service Status",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <AddService
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        service_status_data={service_status_data}
        alert={SuccessAlert}
      />

      {/* <EditTransaction
        handleOpen={handleOpenedit}
        handleClose={handleCloseedit}
        open={openedit}
        handleFormSubmit={handleFormSubmitedit}
        postsucessful={postsucessfuledit}
        Projects={Projects}
        categoriesdata={categoriesdata}
        transactionaccountdata={transactionaccountdata}
        alert={SuccessAlert}
      />

      <DeleteTransaction
        handleOpen={handleOpendelete}
        handleClose={handleClosedelete}
        open={opendelete}
        handleFormSubmit={handleFormSubmitdelete}
        postsucessful={postsucessfuldelete}
        Projects={Projects}
        alert={SuccessAlert}
      />  */}

      <Header title="Service Types" subtitle="List of all Service Types" />
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
        <DataGrid
          rows={Service}
          columns={columns}
          getRowId={(row) => row.service_id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Service;
