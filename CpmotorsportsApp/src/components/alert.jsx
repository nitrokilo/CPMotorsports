import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Collapse, Alert, IconButton } from "@mui/material";

export function SuccessAlert(props) {
  const [open, setOpen] = useState(props.is_on);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.text}
        </Alert>
      </Collapse>
    </Box>
  );
}
