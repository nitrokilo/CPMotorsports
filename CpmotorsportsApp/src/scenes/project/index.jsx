import { Box, Button, MenuItem, Select } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { SuccessAlert } from "../../components/alert.jsx";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../global/tableicons";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import PartJob from "./partjob";
import AddProject from "./addproject";

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

  // Api Call and config
  const [Project, setProject] = useState([]);
  useEffect(() => {
    client
      .get("/project")
      .then((res) => {
        console.log(res.data);
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

  const [showProjects, setshowProjects] = useState(true);
  const [selectedProject, setselectedProject] = useState([]);

  function handlePartjob(projectselected) {
    setselectedProject(projectselected);
    setshowProjects(false);
  }

  function backbutton() {
    setshowProjects(true);
  }

  // Column Configuration
  const columns = [
    { field: "project_id", title: "ID", editable: false },
    {
      field: "vin_num",
      title: "Vin Number",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {vinnumberoptions}
        </Select>
      ),
    },
    { title: "Project Start", field: "project_start", type: "datetime" },

    {
      field: "project_end",
      title: "Project End",
      type: "datetime",
      dateSetting: { locale: "en-US", timeZone: "America/New_York" },
    },
    {
      field: "total_cost",
      title: "Total Cost",
      type: "currency",
      editable: false,
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

  if (showProjects) {
    return (
      <Box m="20px">
        <AddProject
          handleOpen={handleOpenadd}
          handleClose={handleCloseadd}
          open={openadd}
          handleFormSubmit={handleFormSubmitadd}
          postsucessful={postsucessfuladd}
          vinnumdata={vin_nums}
          projectstatusdata={project_statusdata}
          alert={SuccessAlert}
        />
        <Header title="Project" subtitle="List of all Projects" />
        <Box m="40px 0 0 0" height="75vh">
          <MaterialTable
            icons={tableIcons}
            title="Project Data"
            data={Project}
            columns={columns}
            style={{ backgroundColor: colors.primary[400] }}
            actions={[
              {
                icon: tableIcons["More"],
                tooltip: "Part Job",
                onClick: (event, rowData) => handlePartjob(rowData),
              },
            ]}
            editable={{
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (updatedRow["project_end"] === oldRow["project_end"]) {
                      console.log("here");
                      updatedRow["project_end"] = "";
                    }

                    if (
                      updatedRow["project_start"] === oldRow["project_start"]
                    ) {
                      console.log("here");
                      console.log(oldRow["project_start"]);
                      updatedRow["project_start"] = "";
                      console.log(updatedRow["project_start"]);
                    }
                    console.log(updatedRow);
                    console.log(updatedRow["project_end"]);
                    console.log(oldRow["project_end"]);
                    handleFormSubmitedit(updatedRow);
                    resolve();
                  }, 1000);
                }),
            }}
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
                    ExportPdf(cols, datas, "Project"),
                },
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "Project"),
                },
              ],
              filtering: true,
              pageSize: 15,
            }}
          />
        </Box>
      </Box>
    );
  }
  return <PartJob project={selectedProject} backbutton={backbutton} />;
};

export default Project;
