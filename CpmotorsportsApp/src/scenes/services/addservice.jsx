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

export default function AddService(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const servicestatusdata = props.servicestatusdata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const servicestatusoptions = servicestatusdata.map((service_type_status) => (
    <MenuItem value={service_type_status.serv_type_stat_id}>
      {service_type_status.serv_type_stat_name}
    </MenuItem>
  ));

  return (
    <div>
      <Button onClick={handleOpen} color="secondary">
        Add Service
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add a Service Type" />
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
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Service Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.service_name}
                    name="service_name"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Service Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.service_desc}
                    name="service_desc"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="amount"
                    label="Service Cost"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.service_cost}
                    name="service_cost"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Service Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.serv_type_stat_name}
                      label="Service Status"
                      name="serv_type_stat_name"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {servicestatusoptions}
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Service
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && <Alert is_on={true} text="Service added Sucessfully" />}
    </div>
  );
}
const initialValues = {
  description: "",
};
