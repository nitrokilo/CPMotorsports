import { Select, Box, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../components/alert.jsx";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../global/tableicons";
import AddService from "./addservice";
import { ThemeProvider } from "@mui/material/styles";
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
      .post("/service_type", values)
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
      .put("/service_type", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  // Api Call and config
  const [Service, setService] = useState([]);
  useEffect(() => {
    client
      .get("/service_type")
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

  // Edit Capabilities
  const servicestatusoptions = service_status_data.map(
    (service_type_status) => (
      <MenuItem value={service_type_status.serv_type_stat_id}>
        {service_type_status.serv_type_stat_name}
      </MenuItem>
    )
  );

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
      title: "ID",
      width: 5,
      flex: 0.5,
    },

    {
      field: "service_name",
      title: "Service Name",
      flex: 1,
    },

    {
      field: "service_desc",
      title: "Service Description",
      flex: 1,
    },

    {
      field: "service_cost",
      title: "Service Cost",
      type: "currency",
      width: 50,
      cellClassName: "name-column--cell",
    },

    {
      field: "serv_type_stat_name",
      title: "Service Status",
      width: 150,
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
          {servicestatusoptions}
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Service Types" subtitle="List of all Service Types" />
      <AddService
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        servicestatusdata={service_status_data}
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
        <ThemeProvider theme={theme}>
          <MaterialTable
            icons={tableIcons}
            title="Service Type Data"
            data={Service}
            columns={columns}
            editable={{
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    handleFormSubmitedit(updatedRow);
                    resolve();
                  }, 1000);
                }),
            }}
            style={{ backgroundColor: colors.primary[400] }}
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
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "Service"),
                },
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "Service"),
                },
              ],
              filtering: true,
              pageSize: 15,
            }}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default Service;
