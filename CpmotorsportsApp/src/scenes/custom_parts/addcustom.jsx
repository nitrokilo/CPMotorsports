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

export default function AddCustom(props) {
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

  const customerstatusoptions = customerstatusdata.map((customer_status) => (
    <MenuItem value={customer_status.customer_stat_id}>
      {customer_status.customer_stat_name}
    </MenuItem>
  ));

  return (
    <div>
      <Button onClick={handleOpen} color="secondary">
        Add Custom Part
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add Custom Part" subtitle="Add Custom Part" />
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
                    label="Custom Part Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.trans_name}
                    name="trans_name"
                    sx={{ gridColumn: "span 3" }}
                  />
                  <br />
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Metal Type
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
                      {customerstatusoptions}
                    </Select>
                  </FormControl>
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Car System
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
                      {customerstatusoptions}
                    </Select>
                  </FormControl>
                  <br />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Fabrication Type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.trans_name}
                    name="trans_name"
                    sx={{ gridColumn: "span 3" }}
                  />
                  <br />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="number"
                    label="Custom Part Cost"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
                    name="amount"
                    sx={{ gridColumn: "span 3" }}
                  />
                  <br />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Desciption"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.transaction_date}
                    name="transaction_date"
                    sx={{ gridColumn: "span 3" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Custom Part
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && (
        <Alert is_on={true} text="Transaction added Sucessfully" />
      )}
    </div>
  );
}
const initialValues = {
  description: "",
};
