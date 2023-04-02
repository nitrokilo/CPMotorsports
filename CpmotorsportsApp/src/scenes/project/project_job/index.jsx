import { Box } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useEffect, useState } from "react";
import client from "../../../Api/apiconfig.js";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { SuccessAlert } from "../../../components/alert.jsx";
const Project_Job = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Project Job
  const [openadd, setOpenadd] = useState(false);
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add Project Job component
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/project_job", values)
      .then(setOpenadd(false))
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Project Job
  const [openedit, setOpenedit] = useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/add_project_job", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

  /*
  // Definitions for Delete Customer
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
  };*/
  // Api Call and config
  const [Project_Job, setProject_Job] = useState("");
  useEffect(() => {
    client
      .get("/project_jobs")
      .then((res) => {
        setProject_Job(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [project_job_statusdata, setproject_job_statusdata] = useState([]);

  // Api call to get Project Job status for select option
  useEffect(() => {
    client
      .get("/project_job_stat_id")
      .then((res) => {
        setproject_job_statusdata(res.data);
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
    { field: "project_id", headerName: "Project ID", flex: 0.5 },
    { field: "part_job_id", headerName: "Part Job ID", flex: 1 },
    { field: "project_job_stat_id", headerName: "Project Job Status ID", flex: 1 },
   
  ];

  return (
    <Box m="20px">
       <AddProjectJob
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        projectjobstatusdata={project_job_statusdata}
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

      <Header title="ProjectJob" subtitle="List of all Projects" />
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
          title="Project Job Data"
          data={Project}
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


export default Project_Job;
