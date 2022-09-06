import React from "react";
import { Alert, Snackbar } from "@mui/material";

function Alerts({ open, handleClose, severity, children, sx, x, y }) {
  return (
    <Snackbar
      open={open}
      sx={sx}
      anchorOrigin={{
        vertical: y ? y : "top",
        horizontal: x ? x : "left",
      }}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        sx={{
          minWidth: "200px",
        }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}

export default Alerts;
