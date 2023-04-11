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

export default function AddProject(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const vin_nums = props.vinnumdata;
  const project_statusdata = props.projectstatusdata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const vinnumberoptions = vin_nums.map((number) => (
    <MenuItem value={number.vin_num}>
      ({number.customer}) {number.vin_num}
    </MenuItem>
  ));

  const project_statusoptions = project_statusdata.map((project_status) => (
    <MenuItem value={project_status.project_stat_id}>
      {project_status.project_stat_name}
    </MenuItem>
  ));

  return (
    <div>
      <MyButton
        onClick={handleOpen}
        color="secondary"
        text="Add Project"
      ></MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add Project" />
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
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
                    <InputLabel>VIN Number</InputLabel>
                    <Select
                      value={values.vin_num}
                      label="VIN Number"
                      name="vin_num"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {vinnumberoptions}
                    </Select>
                  </FormControl>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    variant="filled"
                    type="date"
                    label="Project Start"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.project_start}
                    name="project_start"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Project End"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.project_end}
                    name="project_end"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Project Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.project_stat_name}
                      label="Project Status"
                      name="project_stat_name"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {project_statusoptions}
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="left" mt="5px">
                  (*) - Means the field is required.
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Project
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
const initialValues = {
  description: "",
};
