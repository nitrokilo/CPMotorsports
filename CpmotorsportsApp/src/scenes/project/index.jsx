import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridColTypeDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddTransaction from "./addtransaction";
import EditTransaction from "./edittransaction";
import DeleteTransaction from "./edittransaction";
import { SuccessAlert } from "../../components/alert.jsx";

const Projects = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Transaction
  const [openadd, setOpenadd] = useState(false);
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add Transaction component
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/Projects", values)
      .then(setOpenadd(false))
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Transaction
  const [openedit, setOpenedit] = useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/Projects", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  // Definitions for Delete Transaction
  const [opendelete, setOpendelete] = useState(false);
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
  };
  // Api Call and config
  const [Projects, setProjects] = useState("");
  useEffect(() => {
    client
      .get("/Projects")
      .then((res) => {
        setProjects(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [transactionaccountdata, setTransactionaacountdata] = useState([]);

  // Api call to get categories for select option
  useEffect(() => {
    client
      .get("/categories")
      .then((res) => {
        setCategoriesdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Api call to get transaction account for select option
  useEffect(() => {
    client
      .get("/transaction_accounts")
      .then((res) => {
        setTransactionaacountdata(res.data);
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
    { field: "transaction_id", headerName: "ID", flex: 0.5 },
    { field: "trans_name", headerName: "Transaction Name", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      valueFormatter: ({ value }) => currencyFormatter.format(value),
      headerAlign: "left",
      align: "left",
    },
    {
      field: "category_desc",
      headerName: "Category",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "transaction_date",
      headerName: "Transaction Date",
      flex: 1,
    },
    {
      field: "acc_name",
      headerName: "Transaction Account",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <AddTransaction
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        categoriesdata={categoriesdata}
        transactionaccountdata={transactionaccountdata}
        alert={SuccessAlert}
      />

      <EditTransaction
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
      />

      <Header title="Projects" subtitle="List of all Projects" />
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
          rows={Projects}
          columns={columns}
          getRowId={(row) => row.transaction_id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Projects;
