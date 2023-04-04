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
  const servicvestatusdata = props.servicvestatusdata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const servicestatusoptions = servicvestatusdata.map((service_status) => (
    <MenuItem value={service_status.service_id}>
      {" "}
      {service_status.service_desc}{" "}
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
          <Header title="ADD Service" subtitle="ADD Service" />
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
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.category_id}
                      label="category_id"
                      name="category_id"
                      onChange={handleChange}
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="date"
                    label="Transaction Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.transaction_date}
                    name="transaction_date"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    required
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Transaction Description"
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    sx={{ gridColumn: "span 4" }}
                  />
                  <FormControl required sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Transaction Account
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.trans_acc}
                      label="trans_acc"
                      onChange={handleChange}
                      name="trans_acc"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {}
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
