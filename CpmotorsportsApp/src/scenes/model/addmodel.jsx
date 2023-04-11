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

export default function AddModel(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const makedata = props.makedata;
  const vehicletypedata = props.vehicletypedata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const MakeOptions = makedata.map((make) => (
    <MenuItem value={make.make_id}> {make.make_name} </MenuItem>
  ));

  const VehicleTypeOptions = vehicletypedata.map((vehicle_type) => (
    <MenuItem value={vehicle_type.vic_type_id}>
      {" "}
      {vehicle_type.vic_type_name}{" "}
    </MenuItem>
  ));

  return (
    <div>
      <MyButton
        onClick={handleOpen}
        color="secondary"
        text="Add Model"
      ></MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add Model" />
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
                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Make
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.make_name}
                      label="Make"
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

                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Model"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.model_name}
                    name="model_name"
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Vehicle Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.vic_type_name}
                      label="Vehicle Type"
                      onChange={handleChange}
                      name="vic_type_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {VehicleTypeOptions}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prod_year}
                    name="prod_year"
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="left" mt="5px">
                  (*) - Means the field is required.
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Model
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && <Alert is_on={true} text="Model added Sucessfully" />}
    </div>
  );
}
const initialValues = {
  description: "",
};
