import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../components/alert.jsx";
import AddCustom from "./addcustom";
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
  const [CustomPart, setCustomPart] = useState("");
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Column Configuration
  const columns = [
    { 
      field: "cust_part_id", 
      headerName: "ID", 
      flex: 0.5 
    },

    { 
      field: "car_sys_id",
      headerName: "Car System ID", 
      flex: 1 
    },

    { 
      field: "metal_id", 
      headerName: "Metal ID", 
      flex: 1 
    },

    {
      field: "cust_part_name",
      headerName: "Custom Part Name",
      flex: 1,
    },

    {
      field: "fab_type",
      headerName: "Fabrication Type",
      flex: 1,
    },
    {
      field: "cust_part_desc",
      headerName: "Part Description",
      flex: 1,
    },
    {
      field: "cust_part_cost",
      headerName: "Part Cost",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <AddCustom
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
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

      <Header title="Custom Parts" subtitle="List of all Custom Parts" />
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
          rows={CustomPart}
          columns={columns}
          getRowId={(row) => row.custom_part_id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default CustomParts;
