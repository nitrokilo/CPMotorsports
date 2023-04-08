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

export default function AddCustomerCar(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const customer_data = props.customerdata;
  const make_data = props.makedata;
  const model_data = props.modeldata;
  const ownership_statusdata = props.ownershipstatusdata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const CustomerOptions = customer_data.map((customer) => (
    <MenuItem value={customer.customer_id}>
      ({customer.customer_id}) {customer.Customer}
    </MenuItem>
  ));

  const MakeOptions = make_data.map((make) => (
    <MenuItem value={make.make_id}>{make.make_name}</MenuItem>
  ));

  const ModelOptions = model_data.map((model) => (
    <MenuItem value={model.model_id}>
      ({model.make_name}) {model.model_name} {model.prod_year}
    </MenuItem>
  ));

  const OwnershipStatusOptions = ownership_statusdata.map(
    (ownership_status) => (
      <MenuItem value={ownership_status.ownership_stat_id}>
        {ownership_status.ownership_stat_name}
      </MenuItem>
    )
  );

  return (
    <div>
      <MyButton onClick={handleOpen} text="Add Car to Customer"></MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add a Customer Car" />
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
                    label="VIN No."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.vin_num}
                    name="vin_num"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Customer Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.Customer}
                      label="Customer"
                      onChange={handleChange}
                      name="Customer"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {CustomerOptions}
                    </Select>
                  </FormControl>

                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Make
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.make_name}
                      label="Make Name"
                      onChange={handleChange}
                      name="make_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {MakeOptions}
                    </Select>
                  </FormControl>

                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Model
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.model_name}
                      label="Model"
                      onChange={handleChange}
                      name="model_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {ModelOptions}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Color"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.color}
                    name="color"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Ownership Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.ownership_stat_name}
                      label="Ownership Status"
                      onChange={handleChange}
                      name="ownership_stat_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {OwnershipStatusOptions}
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Car to Customer
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && (
        <Alert is_on={true} text="Customer Car added Sucessfully" />
      )}
    </div>
  );
}
const initialValues = {
  description: "",
};
