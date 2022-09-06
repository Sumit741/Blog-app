import React, { useContext, useEffect, useState } from "react";
import "../../styles/styles.scss";
import Card from "../../components/card/Card";
import { Avatar } from "@mui/material";
import { UserContext } from "../../context/Context";
import NoPostMessage from "../../components/posts/NoPostMessage";

function Profile() {
  const userDet = useContext(UserContext);
  const [data, setData] = useState([]);
  const [showError, setShowError] = useState(false);
  let localStorageItems = JSON.parse(localStorage.getItem("blogData"));
  useEffect(() => {
    if (userDet) {
      const filteredData = [...localStorageItems].filter(
        (blog) => blog.userId === userDet.userDet.userId
      );
      if (filteredData.length > 0) {
        setData(filteredData);
      } else {
        setShowError(true);
      }
    }
  }, []);
  return (
    <div className="profile-section">
      <div className="profile-container">
        <Avatar
          sx={{
            bgcolor: "orangered",
            cursor: "pointer",
            height: 126,
            width: 126,
            fontSize: "25px",
          }}
        >
          {userDet.userDet.username
            .split("")
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </Avatar>
        <div className="info">
          <h2>{userDet.userDet.username}</h2>
          <div>
            <span>{data.length} posts</span>
            <span> | </span>
            <span>33 likes</span>
          </div>
        </div>
      </div>
      {showError && <NoPostMessage />}
      {!showError && <Card data={data} />}
    </div>
  );
}

export default Profile;
