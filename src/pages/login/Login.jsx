import {
  Box,
  Divider,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/button/Button.jsx";
import Alerts from "../../components/alert/Alerts.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import "../../styles/styles.scss";
import { Link, useNavigate } from "react-router-dom";
import uuid from "react-uuid";

function Login() {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));
  const username = useRef();
  const id = uuid();
  const password = useRef();
  const [open, setOpen] = useState(false);
  const [alertDet, setAlertDet] = useState({ text: "", severity: "" });
  let localStorageData = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let userLoggedIn = localStorage.getItem("loggedUser");
    if (userLoggedIn) {
      navigate("/blogs");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpen(true);

    if (username.current.value !== "" || password.current.value !== "") {
      const filterdUser = localStorageData.filter(
        (user) => user.username === username.current.value
      );

      if (filterdUser.length > 0) {
        if (filterdUser[0].password === password.current.value) {
          setOpen(true);
          setAlertDet({ text: "Login successful", severity: "success" });
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({
              username: username.current.value,
              userId: filterdUser[0].userId,
              type: "user",
            })
          );
          navigate("/blogs");
        } else {
          setOpen(true);
          setAlertDet({ text: "Incorrect Password", severity: "error" });
        }
      } else {
        setOpen(true);
        setAlertDet({ text: "Invalid Username", severity: "error" });
      }
    } else {
      setOpen(true);
      setAlertDet({ text: "Check Empty Fields", severity: "error" });
    }
  };

  const guestHandler = () => {
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({ username: "Guest", userId: id, type: "guest" })
    );
  };
  return (
    <>
      <Alerts
        open={open}
        handleClose={handleClose}
        severity={alertDet.severity}
      >
        {alertDet.text}
      </Alerts>

      <form onSubmit={submitHandler} data-aos="fade-right">
        <Typography
          variant={"h5"}
          sx={{
            m: 3,
            fontSize: match && "20px",
          }}
        >
          Welcome to Login Page
        </Typography>
        <TextField
          inputRef={username}
          variant="outlined"
          label="Email or Username"
          size="small"
          sx={{
            mb: 2,
            width: "80%",
          }}
        />
        <TextField
          inputRef={password}
          type="password"
          variant="outlined"
          label="Password"
          size="small"
          sx={{
            mb: 2,
            width: "80%",
          }}
        />
        <Button
          variant="contained"
          sx={{
            mb: 3,
            width: "80%",
          }}
          type="submit"
        >
          Login
        </Button>
        <div>
          <Typography variant={"p"} color="#a3a5a7">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </div>
        <div className="divider">
          <div></div>
          <Typography>Or</Typography>
          <div></div>
        </div>
        <Link to="/blogs" onClick={guestHandler}>
          Continue as guest
        </Link>
      </form>
    </>
  );
}

export default Login;
