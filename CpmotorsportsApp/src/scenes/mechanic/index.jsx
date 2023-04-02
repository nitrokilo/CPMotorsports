import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../components/alert.jsx";
import AddMechanic from "./addmechanic";
const Mechanic = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Mechanic
  const [openadd, setOpenadd] = useState(false);
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add Mechanic component
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/add_mechanic", values)
      .then(setOpenadd(false))
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Mechanic
  const [openedit, setOpenedit] = useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/edit_mechanic", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  // Definitions for Delete Customer
  /*const [opendelete, setOpendelete] = useState(false);
  const handleOpendelete = () => setOpendelete(true);
  const handleClosedelete = () => setOpendelete(false);

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
  const [Mechanic, setMechanic] = useState("");
  useEffect(() => {
    client
      .get("/mechanic")
      .then((res) => {
        setMechanic(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [mechanic_statusdata, setmechanic_statusdata] = useState([]);

  // Api call to get mechanic status for select option
  useEffect(() => {
    client
      .get("/mechanic_status")
      .then((res) => {
        setmechanic_statusdata(res.data);
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
  const mechanicstatusoptions = mechanic_statusdata.map((mechanic_status) => (
    <MenuItem value={mechanic_status.mechanic_stat_id}>
      {mechanic_status.mechanic_stat_name}
    </MenuItem>
  ));

  // Column Configuration
  const columns = [
    { field: "mechanic_id", headerName: "ID", flex: 0.5 },
    { field: "mechanic_first_name", headerName: "First Name", flex: 1 },
    { field: "mechanic_last_name", headerName: "Last Name", flex: 1 },

    {
      field: "mechanic_phone_number",
      headerName: "Phone Number",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "mechanic_email",
      headerName: "Mechanic Email",
      flex: 1,
    },
    {
      field: "mech_hourly_pay",
      headerName: "Mechanic Hourly Pay",
      flex: 1,

      field: "mech_stat_id",
      headerName: "Mechanic Static Id",
      flex: 1,

    },
  ];

  return (
    <Box m="20px">
      <AddMechanic
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        Mechanicstatusdata={mechanic_statusdata}
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

      <Header title="Mechanic" subtitle="List of all Mechanics" />
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
          title="Mechanic Data"
          data={Mechanic}
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
            exportButton: true,
            filtering: true,
            pageSize: 15,
          }}
        />
      </Box>
    </Box>
  );
};

export default Mechanic;
