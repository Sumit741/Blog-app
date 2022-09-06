import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Box,
  TextField,
  CardMedia,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import Buttons from "../button/Button";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import "../../styles/styles.scss";

function Cards({ data }) {
  const [collapse, setCollapse] = useState(false);

  const getfulldate = (date) => {
    var dt = new Date(date);
    var month = dt.toLocaleString("en-us", { month: "long" });
    var day = dt.getDate();
    var year = dt.getFullYear();
    return `${month} ${day.length > 1 ? day : "0" + day}, ${year}`;
  };
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      flexDirection="column"
      alignItems="center"
    >
      {data
        .sort((a, b) => (b.createdDate > a.createdDate ? 1 : -1))
        .map((blog) => (
          <Grid item xs={8} md={6} mt={3} key={blog.id}>
            <Card variant="outlined" xl={8}>
              <CardHeader
                avatar={
                  <Tooltip title={blog.username}>
                    <Avatar sx={{ bgcolor: "orangered", cursor: "pointer" }}>
                      {blog.username
                        .split("")
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </Avatar>
                  </Tooltip>
                }
                title={blog.title}
                subheader={getfulldate(blog.createdDate)}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardMedia component="img" image={blog.image} alt="image" />
              <CardContent>
                <Typography>{blog.content}</Typography>
              </CardContent>
              <CardActions>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton>
                  <MapsUgcRoundedIcon onClick={() => setCollapse(!collapse)} />
                </IconButton>
              </CardActions>
              <Collapse in={collapse}>
                <CardContent>
                  <Box>
                    <Typography sx={{ fontFamily: "poppins" }}>
                      Comments
                    </Typography>
                    <div className="comment-section">
                      <div className="comment-container">
                        <div>
                          <Avatar
                            sx={{
                              bgcolor: "orangered",
                              cursor: "pointer",
                              width: 25,
                              height: 25,
                              fontSize: "12px",
                            }}
                          >
                            SG
                          </Avatar>
                          <span>Sumit Sunar</span>
                        </div>
                        <p>Very nice</p>
                      </div>
                      <div className="comment-container">
                        <div>
                          <Avatar
                            sx={{
                              bgcolor: "orangered",
                              cursor: "pointer",
                              width: 25,
                              height: 25,
                              fontSize: "12px",
                            }}
                          >
                            SG
                          </Avatar>
                          <span>Sumit Sunar</span>
                        </div>
                        <p>Very nice</p>
                      </div>
                      <div className="comment-container">
                        <div>
                          <Avatar
                            sx={{
                              bgcolor: "orangered",
                              cursor: "pointer",
                              width: 25,
                              height: 25,
                              fontSize: "12px",
                            }}
                          >
                            SG
                          </Avatar>
                          <span>Sumit Sunar</span>
                        </div>
                        <p>Very nice</p>
                      </div>
                    </div>
                  </Box>
                  <form>
                    <TextField fullWidth label="Write a comment" />
                    <Buttons
                      variant="contained"
                      sx={{
                        mt: 2,
                        width: "100%",
                      }}
                    >
                      Post
                    </Buttons>
                  </form>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default Cards;
