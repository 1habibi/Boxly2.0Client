import { Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "../pages/Home/Home.jsx";
import { Login } from "../pages/Login/Login.jsx";
import { Register } from "../pages/Register/Register.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";
import { UserProfile } from "@/pages/UserProfile/UserProfile.jsx";
import { RequierAuth } from "@/copmonents/shared/RequireAuth/RequierAuth.jsx";
import { Welcome } from "@/pages/Welcome/Welcome.jsx";

export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USER_PROFILE: "/user-profile",
  WELCOME: "/welcome",
};

export const routes = () => (
  <Routes>
    <Route path={"/"} element={<Home />}></Route>
    <Route path={"/login"} element={<Login />}></Route>
    <Route path={"/register"} element={<Register />}></Route>
    <Route path={"/user-profile"} element={<UserProfile />}></Route>
    <Route path={"*"} element={<NotFound />}></Route>
    <Route element={<RequierAuth />}>
      <Route path={"/welcome"} element={<Welcome />}></Route>
    </Route>
  </Routes>
);
