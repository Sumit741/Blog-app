import { Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Buttons from "../../components/button/Button";
import Card from "../../components/card/Card";
import NoPostMessage from "../../components/posts/NoPostMessage";

function Blogs() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [blogs, setBlogs] = useState([]);
  const [filterdData, setFilteredData] = useState([]);
  const [showError, setShowError] = useState(false);
  const filterValue = useRef();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("blogData"));
    setBlogs(items);
    setFilteredData(items);
  }, []);

  const searchHandler = () => {
    if (filterValue.current.value !== "") {
      const blogsFiltered = blogs.filter((blog) => {
        return (
          blog.content
            .toLowerCase()
            .includes(filterValue.current.value.toLowerCase()) ||
          blog.category
            .toLowerCase()
            .includes(filterValue.current.value.toLowerCase()) ||
          blog.title
            .toLowerCase()
            .includes(filterValue.current.value.toLowerCase()) ||
          blog.username
            .toLowerCase()
            .includes(filterValue.current.value.toLowerCase())
        );
      });

      setFilteredData(blogsFiltered);

      if (blogsFiltered.length === 0) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    } else {
      setFilteredData([...blogs]);
      setShowError(false);
    }
  };

  return (
    <div>
      {blogs.length > 0 && (
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            item
            xs={8}
            md={6}
            mt={3}
            display="flex"
            flexDirection={isSmall ? "column" : "row"}
            justifyContent={"space-between"}
          >
            <TextField
              inputRef={filterValue}
              label="search posts"
              sx={{ width: isSmall ? "100%" : "80%" }}
              size="small"
              onChange={searchHandler}
            />
            <Buttons
              variant="contained"
              sx={{
                width: isSmall ? "100%" : "19%",
                mt: isSmall ? 1 : 0,
                pt: 1,
                pb: 0.8,
              }}
              onClick={searchHandler}
            >
              Search
            </Buttons>
          </Grid>
        </Grid>
      )}

      {blogs.length > 0 ? <Card data={[...filterdData]} /> : <NoPostMessage />}

      {showError && (
        <div className="search-error-container">
          <img src={"./sear.ico"} />
          <h3>Sorry! No result found :(</h3>
          <span>We're sorry what you were looking for, Try again</span>
        </div>
      )}
    </div>
  );
}

export default Blogs;
