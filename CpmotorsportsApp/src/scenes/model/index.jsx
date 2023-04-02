import { Box, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../components/alert.jsx";
import MaterialTable from "material-table";
import { tableIcons } from "../global/tableicons";

const Make = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Make
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add Make component
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/model", values)
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Make
  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/model", values)
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
  const [Make, setMake] = useState([]);
  useEffect(() => {
    client
      .get("/model")
      .then((res) => {
        setMake(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [make_data, setmake_data] = useState([]);

  // Api call to get make status for select option
  useEffect(() => {
    client
      .get("/make")
      .then((res) => {
        setmake_data(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Api call and config for Categories and Transaction Accounts
  const [vehicle_type_data, setvehicle_type_data] = useState([]);

  // Api call to get make status for select option
  useEffect(() => {
    client
      .get("/vehicle_type")
      .then((res) => {
        setvehicle_type_data(res.data);
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
  const MakeOptions = make_data.map((make) => (
    <MenuItem value={make.make_id}>
      {make.make_name}
    </MenuItem>
  ));

  // Edit Capabilities
  const VehicleTypeOptions = vehicle_type_data.map((vehicle_type) => (
    <MenuItem value={vehicle_type.vic_type_id}>
      {vehicle_type.vic_type_name}
    </MenuItem>
  ));

  // Column Configuration
  const columns = [
    { field: "model_id", title: "ID", flex: 0.5, editable: false },
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
    { field: "model_name", title: "Model", flex: 1 },
    {
      field: "vic_type_name",
      title: "Vehicle Type",
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
          {VehicleTypeOptions}
        </Select>
      ),
    },
    { field: "prod_year", title: "Year", flex: 1 },
    
  ];

  return (
    <Box m="20px">
      <Header title="Model" subtitle="List of all Models" />
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
          title="Make Data"
          data={Make}
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

export default Model;
