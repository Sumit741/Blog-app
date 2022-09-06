import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/styles.scss";

function Analytics() {
  return (
    <div className="analytics-container">
      <div className="links">
        <NavLink to="">Posts Analytics</NavLink>
        {/* <NavLink to="hello">Likes</NavLink>
        <NavLink to="hello">Categories</NavLink> */}
      </div>
      <div className="charts">
        <Outlet />
      </div>
    </div>
  );
}

export default Analytics;
