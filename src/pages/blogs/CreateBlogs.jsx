import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Buttons from "../../components/button/Button";
import axios, { Axios } from "axios";
import { categories } from "../../blogCategory/category";
import Alert from "../../components/alert/Alerts";
import { UserContext } from "../../context/Context";
import Typographys from "../../components/Typography/Typography";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/imageuploader/ImageUpload";
import CloseIcon from "@mui/icons-material/Close";

function CreateBlogs() {
  const category = useRef();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const title = useRef();
  const content = useRef();
  const dateTime = new Date();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [file, setFile] = useState([]);
  const [imgLink, setImgLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleImageUpload = (imgFile) => {
    setFile(imgFile);
  };
  useEffect(() => {
    if (file.length > 0) {
      setShowModal(true);
      const data = new FormData();
      data.append("file", file[0]);
      data.append("upload_preset", "image_preset");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/sumitimgcloud/image/upload",
          data
        )
        .then((response) => {
          setImgLink(response.data.url);
          setShowModal(false);
        })
        .catch((response) => response.message);
    }
  }, [file]);
  useState(() => {
    // const blankarr = [];
    // const haveData = localStorage.getItem("blogData");
    // if (haveData === undefined || haveData === null) {
    //   localStorage.setItem("blogData", JSON.stringify(blankarr));
    // }
    setValue("none");
    console.log(user);
  }, []);
  const [alertDet, setAlertDet] = useState({ text: "", severity: "" });
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    setOpen(true);
    e.preventDefault();
    if (
      category.current.value !== "none" &&
      title.current.value !== "" &&
      content.current.value !== "" &&
      file.length > 0
    ) {
      const data = {
        username: user.userDet.username,
        userId: user.userDet.userId,
        category: category.current.value,
        title: title.current.value,
        content: content.current.value,
        createdDate: dateTime,
        comments: [],
        likes: [],
        image: imgLink,
      };
      let arr = [];
      const blogData = JSON.parse(localStorage.getItem("blogData"));
      arr = [...blogData, data];
      localStorage.setItem("blogData", JSON.stringify(arr));
      setAlertDet({ title: "Post Added Successfully", severity: "success" });

      setValue("none");
      title.current.value = "";
      content.current.value = "";
      setFile([]);
    } else {
      setAlertDet({ title: "Check Empty Fields", severity: "error" });
    }
  };

  const clickHandlerGuest = () => {
    navigate("/");
    localStorage.removeItem("loggedUser");
  };
  return (
    <div className="blog-container">
      <Backdrop
        open={showModal}
        sx={{
          position: "fixed",
          top: 0,
          zIndex: 5,
        }}
      >
        <CircularProgress />
      </Backdrop>
      {user.userDet.type === "user" ? (
        <form onSubmit={submitHandler}>
          <Alert
            severity={alertDet.severity}
            open={open}
            handleClose={() => setOpen(false)}
            x="right"
            y="bottom"
          >
            {alertDet.title}
          </Alert>
          <label>Select Category :</label>
          <FormControl
            fullWidth
            size="small"
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <InputLabel>Blog Category</InputLabel>
            <Select
              value={value}
              label="Blog Category"
              inputRef={category}
              onChange={handleChange}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.category}>
                  {category.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <TextField
          label="Category"
          sx={{
            marginTop: "10px",
            marginBottom: "20px",
          }}
        /> */}
          <label>Title :</label>
          <TextField
            inputRef={title}
            // error={"true"}
            // helperText={"This is an error"}
            label="Title"
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
            }}
          />
          <label>Blog Content :</label>
          <TextField
            rows={5}
            multiline
            inputRef={content}
            label="Write Blog"
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
            }}
          />
          <ImageUpload setImage={handleImageUpload} />
          {file.length > 0 &&
            file.map((file) => (
              <div className="uploaded-image-container">
                <IconButton onClick={() => setFile([])}>
                  <Tooltip title="Remove Selection">
                    <CloseIcon />
                  </Tooltip>
                </IconButton>
                <img key={file.name} src={imgLink} />
              </div>
            ))}
          <Buttons variant="contained" type="submit">
            Post
          </Buttons>
        </form>
      ) : (
        <Grid display={"flex"} flexDirection="column" alignItems={"center"}>
          <Grid item>
            <Typographys
              variant={"h5"}
              sx={{
                mt: 12,
                color: "gray",
              }}
            >
              Please register or login as user to continue
            </Typographys>
          </Grid>

          <Grid item mt={2}>
            <Buttons variant={"contained"} onClick={clickHandlerGuest}>
              Login as user
            </Buttons>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default CreateBlogs;
