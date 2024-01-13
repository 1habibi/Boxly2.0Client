import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home/Home.jsx";
import { Login } from "@/pages/Login/Login.jsx";
import React from "react";
import { NotFound } from "@/pages/NotFound/NotFound.jsx";

export const PATH = {
  HOME: "/",
  LOGIN: "/login",
};

export const routes = () => (
  <Routes>
    <Route path={"/"} element={<Home />}></Route>
    <Route path={"/login"} element={<Login />}></Route>
    <Route path={"*"} element={<NotFound />}></Route>
  </Routes>
);
