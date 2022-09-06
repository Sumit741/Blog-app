import {
  Box,
  Divider,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@mui/material";
import React, { useId, useRef, useState } from "react";
import Button from "../../components/button/Button.jsx";
import Typography from "../../components/Typography/Typography.jsx";
import "../../styles/styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Alerts from "../../components/alert/Alerts.jsx";
import uuid from "react-uuid";

function Register() {
  let date = new Date();
  const navigate = useNavigate();
  const theme = useTheme();
  const id = uuid();
  const match = useMediaQuery(theme.breakpoints.down("md"));
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [open, setOpen] = useState(false);
  const [alertDet, setAlertDet] = useState({ text: "", severity: "" });
  let localStorageData = JSON.parse(localStorage.getItem("users"));

  const handleClose = () => {
    setOpen(false);
  };

  const clearFields = () => {
    username.current.value = "";
    password.current.value = "";
    confirmPassword.current.value = "";
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      username.current.value !== "" ||
      password.current.value !== "" ||
      confirmPassword.current.value !== ""
    ) {
      if (password.current.value !== confirmPassword.current.value) {
        setOpen(true);
        setAlertDet({ text: "Password Mismatch", severity: "error" });
      } else {
        let arr = [];
        const userData = {
          userId: id,
          username: username.current.value,
          password: password.current.value,
          registerdAt: date,
        };
        if (localStorageData.length < 1) {
          arr.push(userData);
          localStorage.setItem("users", JSON.stringify(arr));
          setAlertDet({
            text: "User Registered Successfully",
            severity: "success",
          });
          clearFields();
          setOpen(true);

          // navigate("/");
        } else {
          const filterdUsers = localStorageData.filter(
            (user) => user.username === username.current.value
          );

          if (filterdUsers.length > 0) {
            setAlertDet({ text: "User already exist", severity: "error" });
            setOpen(true);
          } else {
            arr = [...localStorageData, userData];
            localStorage.setItem("users", JSON.stringify(arr));
            setAlertDet({
              text: "User Registered Successfully",
              severity: "success",
            });
            setOpen(true);
            clearFields();
            // navigate("/");
          }
        }
      }
    } else {
      setAlertDet({
        text: "Check empty fields",
        severity: "error",
      });
      setOpen(true);
    }
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
          Registration Page
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
          type={"password"}
          inputRef={password}
          variant="outlined"
          label="Password"
          size="small"
          sx={{
            mb: 2,
            width: "80%",
          }}
        />
        <TextField
          type={"password"}
          inputRef={confirmPassword}
          variant="outlined"
          label="Confirm Password"
          size="small"
          sx={{
            mb: 2,
            width: "80%",
          }}
        />
        <Button
          onClick={submitHandler}
          variant="contained"
          sx={{
            mb: 3,
            width: "80%",
          }}
          type="submit"
        >
          Register
        </Button>
        <div>
          <Typography variant={"p"} color="#a3a5a7">
            Already registed? <Link to="/">Login</Link>
          </Typography>
        </div>
        <div className="divider">
          <div></div>
          <Typography>Or</Typography>
          <div></div>
        </div>
        <Link to="/">Continue as guest</Link>
      </form>
    </>
  );
}

export default Register;
