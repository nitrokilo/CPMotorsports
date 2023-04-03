import { Box, Button, MenuItem, Select} from "@mui/material"; 
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { SuccessAlert } from "../../components/alert.jsx";
import MaterialTable from '@material-table/core';
import { tableIcons } from "../global/tableicons";
import { ExportCsv, ExportPdf } from "@material-table/exporters";


const Project = () => {
  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

  // State definitions for Add Project
  const [openadd, setOpenadd] = useState(false);
  const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Defintions for Add Project component
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client
      .post("/project", values)
      .then(setOpenadd(false))
      .then(setReRender(true))
      .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Project
  const [openedit, setOpenedit] = useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const [postsucessfuledit, setPostsucessfuledit] = useState(false);
  const handleFormSubmitedit = (values) => {
    console.log(values);
    client
      .put("/project", values)
      .then(setOpenedit(false))
      .then(setReRender(true))
      .then(setPostsucessfuledit(true));
  };

/*
  // Definitions for Delete Project
  const [opendelete, setOpendelete] = useState(false);
  const handleOpendelete = () => setOpendelete(true);
  const handleClosedelete = () => setOpendelete(false);

  const [postsucessfuldelete, setPostsucessfuldelete] = useState(false);
  const handleFormSubmitdelete = (values) => {
    const idtodelete = values.trans_id;
    client
      .delete(`/projects/${idtodelete}`)
      .then(setOpendelete(false))
      .then(setReRender(true))
      .then(setPostsucessfuldelete(true));
  };  */
  // Api Call and config
  const [Project, setProject] = useState([]);
  useEffect(() => {
    client
      .get("/project")
      .then((res) => {
        console.log(res.data)
        setProject(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  // Api call and config for Categories and Transaction Accounts
  const [project_statusdata, setproject_statusdata] = useState([]);

  // Api call to get project status for select option
  useEffect(() => {
    client
      .get("/project_status")
      .then((res) => {
        setproject_statusdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // Api call and config for Categories and Transaction Accounts
  const [vin_nums, setvin_nums] = useState([]);

  // Api call to get project status for select option
  useEffect(() => {
    client
      .get("/car_vins")
      .then((res) => {
        setvin_nums(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const project_statusoptions = project_statusdata.map((project_status) => (
    <MenuItem value={project_status.project_stat_id}>
      {project_status.project_stat_name}
    </MenuItem>
  ));


  const vinnumberoptions = vin_nums.map((number) => (
    <MenuItem value={number.vin_num}>
      ({number.customer}) {number.vin_num}
    </MenuItem>
  ));

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });


  // Column Configuration
  const columns = [
    { field: "project_id", title: "ID", editable: false },
    { field: "vin_num", title: "Vin Number", flex: 1 , editComponent: ({ value, onChange, rowData }) => (
      <Select
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        {vinnumberoptions}
      </Select>
    ),},
    { title: 'Project Start', field: "project_start", type:"datetime"},

    {
      field: "project_end",
      title: "Project End",
      type: "datetime",
      dateSetting: { locale: "en-US", timeZone: "America/New_York"}
    },

    {
      field: "total_cost",
      title: "Total Cost",
      type: "currency",
    },
    {
      field: "project_stat_name",
      title: "Project Status",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {project_statusoptions}
        </Select>
      ),
    },
  ];

  return (
    <Box m="20px">
       <Button><Link to="/project_job">Project Job </Link></Button>

      <Header title="Project" subtitle="List of all Projects" />
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
          title="Project Data"
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
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "Project"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "Project"),
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

export default Project;
