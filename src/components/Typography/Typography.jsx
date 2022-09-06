import React from "react";
import { Typography } from "@mui/material";

const Typographys = ({ variant, children, color, sx }) => {
  return (
    <Typography variant={variant} color={color} sx={sx}>
      {children}
    </Typography>
  );
};

export default Typographys;
