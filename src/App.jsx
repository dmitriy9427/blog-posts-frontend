import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";

import { Header } from "./components";
import Login from "./components/Login/Login";
import Registration from "./components/Register/Register";
import { Home, FullPost, AddPost } from "./pages";
import { autchSelector, fetchLoginMe } from "./redux/slices/autch";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./index.css";

function App() {
  const dispatch = useDispatch();
  const autchStatus = useSelector(autchSelector);

  useEffect(() => {
    dispatch(fetchLoginMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:tag" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />

          <Route element={<ProtectedRoute status={autchStatus} />}>
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
