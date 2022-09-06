import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Main from "./pages/main/Main.jsx";
import Register from "./pages/register/Register.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Home from "./pages/home/Home.jsx";
import CreateBlogs from "./pages/blogs/CreateBlogs.jsx";
import Blogs from "./pages/blogs/Blogs.jsx";
import Profile from "./pages/profile/Profile.js";
import Analytics from "./pages/analytics/Analytics.jsx";
import Chart from "./pages/charts.js/Chart.js";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/blogs"
          // element={isAuth ? <Home /> : <Navigate replace to="/" />}
          element={<Home />}
        >
          <Route index element={<Blogs />} />
          <Route path="create-blog" element={<CreateBlogs />} />
          <Route path="analytics" element={<Analytics />}>
            <Route index element={<Chart />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
