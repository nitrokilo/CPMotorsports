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
  useTheme,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { tokens } from "../../theme";
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

export default function AddCustomPart(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const carsystemdata = props.carsystemdata;
  const metaldata = props.metaldata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const CarSystemOptions = carsystemdata.map((car_system) => (
    <MenuItem value={car_system.car_sys_id}>
      {" "}
      {car_system.car_sys_name}{" "}
    </MenuItem>
  ));

  // Mapping for category and transaction account options
  const MetalOptions = metaldata.map((metal_type) => (
    <MenuItem value={metal_type.metal_id}> {metal_type.metal_name} </MenuItem>
  ));

  return (
    <div>
      <MyButton onClick={handleOpen} text="Add Custom Part" />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add Custom Part" />
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
                      Car System Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.car_sys_name}
                      label="Car System"
                      onChange={handleChange}
                      name="car_sys_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {CarSystemOptions}
                    </Select>
                  </FormControl>

                  <FormControl required sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Metal Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.metal_name}
                      label="Metal Name"
                      onChange={handleChange}
                      name="metal_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {MetalOptions}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Custom Part Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cust_part_name}
                    name="cust_part_name"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="text"
                    label="Part Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cust_part_desc}
                    name="cust_part_desc"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    required
                    variant="filled"
                    type="amount"
                    label="Part Cost"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cust_part_cost}
                    name="cust_part_cost"
                    sx={{ gridColumn: "span 2" }}
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
        <Alert is_on={true} text="Custom Part added Sucessfully" />
      )}
    </div>
  );
}
const initialValues = {
  description: "",
};
