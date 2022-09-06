import {
  Box,
  Divider,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button.jsx";
import Alerts from "../../components/alert/Alerts.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import "../../styles/styles.scss";
import { Link, Outlet } from "react-router-dom";

function Main() {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));
  let userArr = [];
  useEffect(() => {
    const userExist = localStorage.getItem("users");
    if (userExist === null || userExist === undefined) {
      localStorage.setItem("users", JSON.stringify(userArr));
    }
  }, []);

  return (
    <div className="container">
      <div
        className="loginFormContainer"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div className="left">
          <Outlet />
        </div>

        {/* </div> */}

        <div className="right"></div>
      </div>
    </div>
  );
}

export default Main;
