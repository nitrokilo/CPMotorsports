import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import MaterialTable from "material-table";
import { tableIcons } from "../global/tableicons";


const Custom_Parts_Per_Project = () => {
// State intialization for rerender to control page render
const [reRender, setReRender] = useState(false);

// Api Call and config
const [Data, setData] = useState([]);
useEffect(() => {
  client
    .get("/reports/custom_parts_per_project")
    .then((res) => {
      setData(res.data);
    })
    .then(setReRender(false))
    .catch((err) => {
      console.log(err);
    });
}, [reRender]);




const theme = useTheme();
const colors = tokens(theme.palette.mode);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Column Configuration
const columns = [
  { field: "vin_num", title: "VIn Number", flex: 0.5 },
  { field: "make_name", title: "Make Name", flex: 1, },
  { field: "model_name", title: "Model Name", flex: 1 },
  { field: "project_date", title: "Project Date", flex: 1 },
  { field: "count", title: "Count", flex: 1 },
  { field: "color", title: "Color", flex: 1 },
 
 

];

return (
  <Box m="20px">


    <Header title="Custom Parts per Project" subtitle="List of all Custom Parts per Project" />
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
        title="Fabrication And Installation"
        data={Data}
        columns={columns}

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

export default Custom_Parts_Per_Project;
