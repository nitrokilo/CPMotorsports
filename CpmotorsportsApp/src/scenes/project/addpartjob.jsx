import * as React from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { Formik } from "formik";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import MyButton from "../global/buttonstyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddPartJob(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const mechanicdata = props.mechanicdata;
  const servicedata = props.servicedata;
  const custompartdata = props.custompartdata;
  const partjob_statusdata = props.partjobstatusdata;
  const Alert = props.alert;
  const ProjectID = props.projectid;

  // Mapping for category and transaction account options
  const part_job_stat_options = partjob_statusdata.map((part_job) => (
    <MenuItem value={part_job.part_job_stat_id}>
      {part_job.part_job_stat_name}
    </MenuItem>
  ));

  const MechanicOptions = mechanicdata.map((mechanic) => (
    <MenuItem value={mechanic.mech_id}>
      {mechanic.Mechanic}</MenuItem>
  ));

  const ServiceOptions = servicedata.map((service_type) => (
    <MenuItem value={service_type.service_id}>
      {service_type.service_name}
    </MenuItem>
  ));

  const CustomPartOptions = custompartdata.map((custom_part) => (
    <MenuItem value={custom_part.car_sys_id}>
      {custom_part.car_sys_name}
    </MenuItem>
  ));

  return (
    <div>
      <MyButton onClick={handleOpen} text="Add Part Job to Project"></MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add Part Job to Project" />
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{
              project_id: { ProjectID },
            }}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <FormControl required>
                    <InputLabel>Part Job Status</InputLabel>
                    <Select
                      value={values.part_job_stat_name}
                      label="Part Job Status"
                      name="part_job_stat_name"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {part_job_stat_options}
                    </Select>
                  </FormControl>
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Mechanic
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.Mechanic}
                      label="Mechanic"
                      name="Mechanic"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {MechanicOptions}
                    </Select>
                  </FormControl>
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Custom Part Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.cust_part_name}
                      label="Custom Part Name"
                      name="cust_part_name"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {CustomPartOptions}
                    </Select>
                  </FormControl>
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Service Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.service_name}
                      label="Service Name"
                      name="service_name"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {ServiceOptions}
                    </Select>
                  </FormControl>

                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    variant="filled"
                    type="date"
                    label="Part Service Start"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.part_serv_start}
                    name="part_serv_start"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    variant="filled"
                    type="date"
                    label="Part Service End"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.part_serv_end}
                    name="part_serv_end"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    variant="filled"
                    type="numeric"
                    label="Actual Time Working"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.actual_time_spent_hrs}
                    name="actual_time_spent_hrs"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    variant="filled"
                    type="numeric"
                    label="Time With Customer"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.actual_time_with_customer}
                    name="time_with_customer"
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Part Job to Project
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && <Alert is_on={true} text="Project added Sucessfully" />}
    </div>
  );
}

