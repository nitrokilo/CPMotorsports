import { Box, Select, MenuItem } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../global/tableicons";
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
      .post("/mechanic", values)
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
      .put("/mechanic", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  // Api Call and config
  const [Mechanic, setMechanic] = useState([]);
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
      .get("/mech_status")
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
    <MenuItem value={mechanic_status.mech_stat_id}>
      {mechanic_status.mech_stat_name}
    </MenuItem>
  ));

  // Column Configuration
  const columns = [
    { field: "mech_id", title: "ID", editable: false, width: 5 },
    { field: "mech_first_name", title: "First Name" },
    { field: "mech_last_name", title: "Last Name" },

    {
      field: "mech_phone_number",
      title: "Phone Number",

      cellClassName: "name-column--cell",
    },
    {
      field: "mech_email",
      title: "Mechanic Email",
    },
    {
      field: "mech_hourly_pay",
      title: "Mechanic Hourly Pay",
      type: "currency",
    },
    {
      field: "mech_stat_name",
      title: "Mechanic Status",
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {mechanicstatusoptions}
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Mechanic" subtitle="List of all Mechanics" />
      <AddMechanic
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        mechstatusdata={mechanic_statusdata}
        alert={SuccessAlert}
      />
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
          style={{ backgroundColor: colors.primary[400] }}
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

export default Mechanic;
