import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../global/tableicons";

const Customer_time = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // Api Call and config
  const [Data, setData] = useState([]);
  useEffect(() => {
    client
      .get("/reports/total_time_customer")
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
    { field: "year", title: "Year", flex: 0.5 },
    {
      field: "Avg_Time_w/Customer",
      title: "Average time With Customer in Hours",
      flex: 1,
      type: "numeric",
    },
    {
      field: "Num_of_Projects",
      title: "Number of Projects",
      flex: 1,
      type: "numeric",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Customer Time" subtitle="Time for Consultation vs Project Work for Past 60 Days" />
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
          data={Data}
          columns={columns}
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
                  ExportPdf(cols, datas, "Customer_Time"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "Customer_Time"),
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

export default Customer_time;
