import {
  AppBar,
  Box,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.scss";
import { UserContext } from "../context/Context";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const changeHandler = (val) => {
    localStorage.setItem("tab", JSON.stringify({ val: val }));
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setOpenDrawer(false);
  };
  const item = JSON.parse(localStorage.getItem("tab"));
  useEffect(() => {
    setValue(item.val);
  }, [item]);

  const profileToggler = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("loggedUser");
    localStorage.setItem("tab", JSON.stringify({ val: 0 }));
  };

  const navigationHandler = (link) => {
    setOpenDrawer(false);
    navigate(link);
  };
  const TypographyCustom = ({ pl }) => (
    <Typography
      variant="h5"
      pl={pl}
      sx={{
        fontWeight: 600,
        fontFamily: "Poppins",
        letterSpacing: 1,
        cursor: "pointer",
      }}
    >
      BLOGGER
    </Typography>
  );

  const profileNavigator = () => {
    localStorage.setItem("tab", JSON.stringify({ val: null }));
    if (user.userDet.type === "user") {
      navigate("profile");
    } else {
      alert("Not authorized");
    }
    setOpen(false);
  };
  const DrawerLink = ({ mt, link, onClick }) => (
    <Grid
      item
      pl={2}
      pt={1}
      pb={1}
      mt={mt}
      sx={{
        ":hover": {
          background: "rgba(0, 0, 0, 0.03)",
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <a>{link}</a>
    </Grid>
  );
  return (
    <AppBar sx={{ background: "white" }}>
      <Toolbar>
        <Grid
          container
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          {isSmall && (
            <>
              <IconButton onClick={() => setOpenDrawer(true)}>
                <MenuIcon
                  sx={{
                    fontSize: "28px",
                  }}
                />
              </IconButton>
            </>
          )}

          {!isSmall && (
            <>
              <Grid
                item
                sx={{ color: "black" }}
                placeitems={"center"}
                onClick={() => {
                  navigate("");
                }}
              >
                <TypographyCustom />
              </Grid>
              <Grid item>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(e, val) => changeHandler(val)}
                >
                  <Tab
                    label="Home"
                    sx={{ fontFamily: "Poppins" }}
                    onClick={() => {
                      navigate("/blogs");
                    }}
                  />
                  <Tab
                    label="CREATE BLOG"
                    sx={{ fontFamily: "Poppins" }}
                    onClick={() => {
                      navigate("create-blog");
                    }}
                  />
                  <Tab
                    sx={{ fontFamily: "Poppins" }}
                    label="ANALYTICS"
                    onClick={() => {
                      navigate("analytics");
                    }}
                  />
                </Tabs>
              </Grid>
            </>
          )}
          <Grid item>
            <Avatar
              className="avatar"
              onClick={profileToggler}
              alt={
                user.userDet !== null || undefined ? user.userDet.username : "G"
              }
              src="/static/images/avatar/2.jpg"
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "150px",
                },
              }}
            >
              <MenuItem onClick={profileNavigator}>Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
      <Drawer
        open={openDrawer}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "180px",
          },
        }}
      >
        <div className="drawer-nav">
          <Grid pt={5}>
            <TypographyCustom pl={2} />
            <DrawerLink
              mt={2}
              link={"Home"}
              onClick={() => navigationHandler("")}
            />
            <DrawerLink
              link={"Create Blogs"}
              onClick={() => navigationHandler("create-blog")}
            />
            <DrawerLink
              link={"Analytics"}
              onClick={() => navigationHandler("analytics")}
            />
          </Grid>
        </div>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
