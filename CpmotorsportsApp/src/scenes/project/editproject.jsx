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
  Autocomplete,
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

export default function EditTransaction(props) {
  // States for select options api

  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Behaviors and states passed as props and renamed
  const handleFormSubmit = (values) => {
    props.handleFormSubmit(values);
  };
  const transactions = props.transactions;
  const transactionoptions = Object.values(transactions);
  const handleOpen = props.handleOpen;
  const handleClose = props.handleClose;
  const open = props.open;
  const postsucessful = props.postsucessful;
  const categoriesdata = props.categoriesdata;
  const transactionaccountdata = props.transactionaccountdata;
  const Alert = props.alert;

  // Mapping for category and transaction account options
  const categoryoptions = categoriesdata.map((category) => (
    <MenuItem value={category.category_id}> {category.category_desc} </MenuItem>
  ));

  const transactionaccountoptions = transactionaccountdata.map(
    (trans_account) => (
      <MenuItem value={trans_account.acc_id}>{trans_account.acc_name}</MenuItem>
    )
  );

  return (
    <div>
      <Button onClick={handleOpen} color="secondary">
        Edit Transaction
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header title="EDIT TRANSACTION" subtitle="EDIT TRANSACTION" />
          <Formik onSubmit={handleFormSubmit} initialValues={initialValuesadd}>
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
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
                  {/* Calling the Autocomplete component and updating its state features */}
                  <Autocomplete
                    disablePortal
                    id="manageable-states-demo"
                    options={transactionoptions}
                    getOptionLabel={(option) =>
                      option.transaction_id ? option.transaction_id : ""
                    }
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.transaction_id} ({option.trans_name}) (
                        {option.transaction_date}) ({option.acc_name})
                      </Box>
                    )}
                    onInputChange={(event, newInputValue) => {
                      setFieldValue("trans_id", newInputValue);
                    }}
                    sx={{ gridColumn: "span 4" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Transaction Details"
                        sx={{ gridColumn: "span 4" }}
                        value={values.id}
                      />
                    )}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Transaction Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.trans_name}
                    name="trans_name"
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Transaction Amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
                    name="amount"
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                      <FormHelperText></FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categoryoptions}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
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
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                      <FormHelperText></FormHelperText>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {transactionaccountoptions}
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Edit Transaction
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {postsucessful && (
        <Alert is_on={true} text="Transaction Edited Sucessfully" />
      )}
    </div>
  );
}
const initialValuesadd = {
  amount: 0,
  description: "",
  trans_name: "",
  category_id: 0,
  transaction_date: "",
  trans_acc: 0,
};

export default function DeleteTransaction(props) {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    // Behaviors and states passed as props and renamed
    const handleFormSubmit = (values) => {
      props.handleFormSubmit(values);
    };
    const transactions = props.transactions;
    const transactionoptions = Object.values(transactions);
    const handleOpen = props.handleOpen;
    const handleClose = props.handleClose;
    const open = props.open;
    const postsucessful = props.postsucessful;
    const Alert = props.alert;
  
    return (
      <div>
        <Button onClick={handleOpen} color="secondary">
          Delete Transaction
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Header title="DELETE TRANSACTION" subtitle="DELETE TRANSACTION" />
            <Formik onSubmit={handleFormSubmit} initialValues={initialValuesdelete}>
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
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
                    {/* Calling the Autocomplete component and updating its state features */}
                    <Autocomplete
                      disablePortal
                      id="manageable-states-demo"
                      // options={["Value 1", "Value 2"]}
                      options={transactionoptions}
                      // getOptionLabel={(user) => user.transaction_id}
                      getOptionLabel={(option) =>
                        option.transaction_id ? option.transaction_id : ""
                      }
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          // sx={{ "& > img": { mr: 2, flexShrink: 3 } }}
                          {...props}
                        >
                          {option.transaction_id} ({option.trans_name}) (
                          {option.transaction_date}) ({option.acc_name})
                        </Box>
                      )}
                      onInputChange={(event, newInputValue) => {
                        // setSelectedtransaction(newInputValue);
                        setFieldValue("trans_id", newInputValue);
                      }}
                      sx={{ gridColumn: "span 4" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Transaction Details"
                          sx={{ gridColumn: "span 4" }}
                          value={values.id}
                        />
                      )}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Delete Transaction
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
  
        {postsucessful && (
          <Alert is_on={true} text="Transaction Deleted Sucessfully" />
        )}
      </div>
    );
  }
  const initialValuesdelete = {};
  