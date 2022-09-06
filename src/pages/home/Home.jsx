import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import "../../styles/styles.scss";
import { UserContext } from "../../context/Context";

function Home() {
  const [user, setUser] = useState({});
  useState(() => {
    const blankarr = [];
    const haveData = localStorage.getItem("blogData");
    if (haveData === undefined || haveData === null) {
      localStorage.setItem("blogData", JSON.stringify(blankarr));
    }

    let userDet = JSON.parse(localStorage.getItem("loggedUser"));
    setUser(userDet);

    const local = localStorage.getItem("tab");
    if (local === null) {
      localStorage.setItem("tab", JSON.stringify({ val: 0 }));
    } else {
      if (local.val < 1) {
        localStorage.setItem("tab", JSON.stringify({ val: 0 }));
      } else {
        return null;
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userDet: user }}>
      <div>
        <Navbar />
        <div className="blog-outlet">
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default Home;
