import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CreateBlog from "./Pages/CreateBlog";
import Rootlayout from "./Rootlayout/Rootlayout";
import Profile from "./Pages/Profile";
import MyBlog from "./Pages/MyBlog";
import BlogDetails from "./Pages/BlogDetails";
import TemplateOne from "./Components/CommonComponents/Templates/TemplateOne";
import Templatetwo from "./Components/CommonComponents/Templates/Templatetwo";
import SearchBlogs from "./Pages/SearchBlogs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Signup />} />
        <Route path="*" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rootlayout" element={<Rootlayout />}>
          <Route path="home" element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="myblog" element={<MyBlog />} />
          <Route path="createblog" element={<CreateBlog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="blogdetails" element={<BlogDetails />} />
          <Route path="templateone" element={<TemplateOne />} />
          <Route path="templatetwo" element={<Templatetwo />} />
          <Route path="searchblogs" element={<SearchBlogs />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
