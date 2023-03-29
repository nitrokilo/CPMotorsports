import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";


const Custom_Parts_Per_Customer = () => {

  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // Api Call and config
  const [Data, setData] = useState("");
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
    { field: "Customer", headerName: "Customer", flex: 0.5 },
    { field: "Most Recent Job", headerName: "Most Recent Job", flex: 1, cellClassName: "name-column--cell",},
    { field: "Num of Projects", headerName: "Num of Projects", flex: 1 },
   

  ];

  return (
    <Box m="20px">


      <Header title="Completed Projects" subtitle="List of all Completed Projects" />
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
          rows={Data}
          columns={columns}
          getRowId={(row) => row.Customer}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Custom_Parts_Per_Customer;
