import { Select, Box, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../global/tableicons";
import { SuccessAlert } from "../../components/alert.jsx";
import AddCustomPart from "./addcustom_part";

const CustomParts = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Custom part
  const [openadd, setOpenadd] = useState(false);
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add custom part
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/custom_part", values)
      .then(setOpenadd(false))
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Custom part
  const [openedit, setOpenedit] = useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/custom_part", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  // Api Call and config
  const [CustomPart, setCustomPart] = useState([]);
  useEffect(() => {
    client
      .get("/custom_part")
      .then((res) => {
        setCustomPart(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [metal_data, setmetal_data] = useState([]);

  // Api call to get metal status for select option
  useEffect(() => {
    client
      .get("/metal_type")
      .then((res) => {
        setmetal_data(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Api call and config for Categories and Transaction Accounts
  const [car_system_data, setcar_system_data] = useState([]);

  // Api call to get car system status for select option
  useEffect(() => {
    client
      .get("/car_system")
      .then((res) => {
        setcar_system_data(res.data);
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
  const MetalOptions = metal_data.map((metal_type) => (
    <MenuItem value={metal_type.metal_id}>{metal_type.metal_name}</MenuItem>
  ));

  // Edit Capabilities
  const CarSystemOptions = car_system_data.map((car_system) => (
    <MenuItem value={car_system.car_sys_id}>{car_system.car_sys_name}</MenuItem>
  ));

  // Column Configuration
  const columns = [
    {
      field: "cust_part_id",
      title: "ID",
      editable: false,
      width: 10,
      flex: 0.5,
    },

    {
      field: "car_sys_name",
      title: "Car System Name",
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
          {CarSystemOptions}
        </Select>
      ),
    },

    {
      field: "metal_name",
      title: "Metal Name",
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
          {MetalOptions}
        </Select>
      ),
    },

    {
      field: "cust_part_name",
      title: "Custom Part Name",
    },

    {
      field: "cust_part_desc",
      title: "Part Description",
      width: 400,
      flex: 1,
    },
    {
      field: "cust_part_cost",
      title: "Part Cost",
      type: "currency",
      width: 50,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Custom Parts" subtitle="List of all Custom Parts" />
      <AddCustomPart
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        carsystemdata={car_system_data}
        metaldata={metal_data}
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
          title=""
          data={CustomPart}
          columns={columns}
          style={{ backgroundColor: colors.primary[400], "padding-right": "90px" }}
          editable={{
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(updatedRow);
                  handleFormSubmitedit(updatedRow);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            headerStyle: {
              fontWeight: "bold",
              fontSize: "18px",
              backgroundColor: colors.primary[500],
            },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) =>
                  ExportPdf(cols, datas, "Custom Parts"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "Custom Parts"),
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

export default CustomParts;
