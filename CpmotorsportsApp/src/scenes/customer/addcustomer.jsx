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

export default function AddCustomer(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const customerstatusdata = props.customerstatusdata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const CustomerStatusOptions = customerstatusdata.map((customer_status) => (
    <MenuItem value={customer_status.customer_stat_id}>
      {" "}
      {customer_status.customer_stat_name}{" "}
    </MenuItem>
  ));

  return (
    <div>
      <MyButton
        text="Add Customer"
        onClick={handleOpen}
        color="secondary"
      ></MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add Customer" />
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
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customer_first_name}
                    name="customer_first_name"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customer_last_name}
                    name="customer_last_name"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Phone Number - (XXX-XXX-XXXX)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customer_phone_number}
                    name="customer_phone_number"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Email - (example@gmail.com)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.customer_email}
                    name="customer_email"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl required sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Customer Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.customer_stat_name}
                      label="Customer Status"
                      onChange={handleChange}
                      name="customer_stat_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      {CustomerStatusOptions}
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Customer
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && (
        <Alert is_on={true} text="Customer added Sucessfully" />
      )}
    </div>
  );
}
const initialValues = {
  description: "",
};
