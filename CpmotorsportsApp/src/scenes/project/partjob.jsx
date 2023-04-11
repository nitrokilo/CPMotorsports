import { Box, Button, MenuItem, Select } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import client from "../../Api/apiconfig.js";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { SuccessAlert } from "../../components/alert";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../global/tableicons";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import MyButton from "../global/buttonstyles";
import AddPartJob from "./addpartjob";

export default function PartJob(props) {
  const Project = props.project;
  const BackButton = props.backbutton;
  const projectid = Project["project_id"];

  // State intialization for rerender to control page render
  const [reRender, setReRender] = useState(false);

   // State definitions for Add Part Job
   const [openadd, setOpenadd] = useState(false);
   const [postsucessfuladd, setPostsucessfuladd] = useState(false);

  // Definitions for add part job
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);
  const handleFormSubmitadd = (values) => {
    console.log(values);
    client.post("/part_job", values)
    .then(setReRender(true))
    .then(setOpenadd(false))
    .then(setPostsucessfuladd(true));
  };

  // Definitions for Edit Part Job

  const handleFormSubmitedit = (values) => {
    console.log(values);
    client.put("/part_job", values).then(setReRender(true));
  };

  //   Api Call and config

  const [partjob_data, setPartjob_data] = useState([]);
  useEffect(() => {
    client
      .get(`/part_job/${projectid}`)
      .then((res) => {
        console.log(res.data);
        setPartjob_data(res.data);
      })
      .then(setReRender(false))
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  //   // Api call and config for Categories and Transaction Accounts
  const [partjob_statusdata, setpartjob_statusdata] = useState([]);

  //   // Api call to get project status for select option
  useEffect(() => {
    client
      .get("/part_job_status")
      .then((res) => {
        setpartjob_statusdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Api call and config for Categories and Transaction Accounts
  const [mechanicdata, setmechanic_data] = useState([]);

  // Api call to get project status for select option
  useEffect(() => {
    client
      .get("/mechanic_name")
      .then((res) => {
        setmechanic_data(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Api call and config for Categories and Transaction Accounts
  const [servicedata, setservice_data] = useState([]);

  // Api call to get project status for select option
  useEffect(() => {
    client
      .get("/service_type")
      .then((res) => {
        setservice_data(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Api call and config for Categories and Transaction Accounts
  const [custompartdata, setcustom_part_data] = useState([]);

  // Api call to get project status for select option
  useEffect(() => {
    client
      .get("/car_system")
      .then((res) => {
        setcustom_part_data(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 

  const part_job_stat_options = partjob_statusdata.map((part_job) => (
    <MenuItem value={part_job.car_sys_id}>
      {part_job.car_sys_name}
    </MenuItem>
  ));

  const MechanicOptions = mechanicdata.map((mechanic) => (
    <MenuItem value={mechanic.mech_id}>{mechanic.Mechanic}</MenuItem>
  ));

  const ServiceOptions = servicedata.map((service_type) => (
    <MenuItem value={service_type.service_id}>
      {service_type.service_name}
    </MenuItem>
  ));

  const CustomPartOptions = custompartdata.map((custom_part) => (
    <MenuItem value={custom_part.cust_part_id}>
      {custom_part.cust_part_name}
    </MenuItem>
  ));



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Column Configuration
  const columns = [
    { field: "part_job_id", title: "ID", editable: false },
    {
      field: "part_job_stat_name",
      title: "Part Job Status",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {part_job_stat_options}
        </Select>
      ),
    },
    {
      field: "mechanic_name",
      title: "Mechanic Name",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {MechanicOptions}
        </Select>
      ),
    },
    {
      field: "cust_part_name",
      title: "Custom Part Name",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {CustomPartOptions}
        </Select>
      ),
    },
    { title: "Part Service Start", field: "part_serv_start", type: "date"},

    {
      field: "part_serv_end",
      title: "Part Service End",
      type: "date",
      
    },
    {
      field: "service_name",
      title: "Service Name",
      flex: 1,
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {ServiceOptions}
        </Select>
      ),
    },
    {
      field: "actual_time_spent_hrs",
      title: "Actual Time Working",
      editable: true,
    },
    {
      field: "time_with_customer",
      title: "Time With Customer",
      type: "Numeric",
    },
    { field: "project_id", title: "Project ID", editable: false },
  ];

  return (
    <Box m="20px">
      <Header
        title="Part Jobs for "
        {...Project["project_id"]}
        subtitle={"Project " + Project["project_id"]}
      />
      <MyButton onClick={BackButton} text="Back"></MyButton>
      <br/>

      <br/>

      <AddPartJob
        handleOpen={handleOpenadd}
        handleClose={handleCloseadd}
        open={openadd}
        handleFormSubmit={handleFormSubmitadd}
        postsucessful={postsucessfuladd}
        partjobstatusdata={partjob_statusdata}
        mechanicdata={mechanicdata}
        custompartdata={custompartdata}
        servicedata={servicedata}
        alert={SuccessAlert}
        projectid = {Project["project_id"]}
      />
      <h1>Customer Name: {Project["Customer"]}</h1>
      <h2>Customer Phone Number: {Project["customer_phone_number"]}</h2>
      <h2>Customer Email: {Project["customer_email"]}</h2>
      <Box m="40px 0 0 0" height="75vh">
        <MaterialTable
          icons={tableIcons}
          title="Part Job Data"
          data={partjob_data}
          style={{ backgroundColor: colors.primary[400] }}
          columns={columns}
          editable={{
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (updatedRow["project_end"] === oldRow["project_end"]) {
                    console.log("here");
                    updatedRow["project_end"] = "";
                  }

                  if (updatedRow["project_start"] === oldRow["project_start"]) {
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
}
