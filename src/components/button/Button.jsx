import { Button } from "@mui/material";
import React from "react";

function Buttons({ variant, color, size, children, sx, type, onClick }) {
  return (
    <>
      <Button
        variant={variant}
        color={color}
        size={size}
        sx={sx}
        type="type"
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
}

export default Buttons;
