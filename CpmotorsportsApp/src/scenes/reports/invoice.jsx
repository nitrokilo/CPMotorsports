import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import MaterialTable from "material-table";
import { tableIcons } from "../global/tableicons";


const Invoice = () => {

  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // Api Call and config
  const [Data, setData] = useState([]);
  useEffect(() => {
    client
      .get("/reports/invoices_with_line_items")
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
    {field: "Customer", title: "Customer", flex: 0.5 },
    {field: "End Date", title: "End Date", type: "date" }, 
    {field: "Labor", title: "Labor", type: "currency" },
    {field: "Mechanic", title: "Mechanic", flex: 0.5 },
    {field: "Total", title: "Total", flex: 0.5 },
    {field: "car_sys_name", title: "car_sys_name", flex: 0.5 },
    {field: "cust_part_cost", title: "cust_part_cost", flex: 0.5 },
    {field: "cust_part_name", title: "cust_part_name", flex: 0.5 },
    {field: "customer_phone_number", title: "customer_phone_number", flex: 0.5 },
    {field: "make_name", title: "make_name", flex: 0.5 },
    // {field: "Customer", headerName: "Customer", flex: 0.5 },
    // {field: "metal_name", headerName: "metal_name", flex: 0.5 },
    // {field: "model_name", headerName: "model_name", flex: 0.5 },
    // {field: "service_cost", headerName: "service_cost", flex: 0.5 },
    // {field: "service_name", headerName: "service_name", flex: 0.5 },
    // {field: "total_cost", headerName: "total_cost", flex: 0.5 },
    // {field: "vin_num", headerName: "vin_num", flex: 0.5 }

  ];

  return (
    <Box m="20px">
      <Header title="Invoice" subtitle="List of all Completed Projects" />
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
          title="Customer Data"
          data={Data}
          columns={columns}
          detailPanel={rowData => {
        return (
         <div>
         Labor: {rowData['Labor']} <br/>
         Metal Name:{rowData ["metal_name"]} <br/>
         model_name: {rowData ["model_name"]} <br/>
         service_cost: {rowData ["service_cost"]} <br/>
         service_name: {rowData ["service_name"]} <br/>
         total_cost: {rowData ["total_cost"]} <br/>
         vin_num: {rowData ["vin_num"]} <br/>
         </div>
        )
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
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
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "Invoice"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "Invoice"),
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

export default Invoice;
