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

export default function AddMake(props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const makestatusdata = props.makestatusdata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const MakeStatusOptions = makestatusdata.map((make_status) => (
    <MenuItem value={make_status.make_stat_id}>
      {" "}
      {make_status.make_stat_name}{" "}
    </MenuItem>
  ));

  return (
    <div>
      <MyButton onClick={handleOpen} text="Add Make"></MyButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="Add Make" />
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
                    label="Make"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.make_name}
                    name="make_name"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl required sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-required-label">
                      Make Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={values.make_stat_name}
                      label="Make Status"
                      onChange={handleChange}
                      name="make_stat_name"
                    >
                      <FormHelperText>Required</FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {MakeStatusOptions}
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="left" mt="5px">
                  (*) - Means the field is required.
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add Make
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && <Alert is_on={true} text="Make added Sucessfully" />}
    </div>
  );
}
const initialValues = {
  description: "",
};
