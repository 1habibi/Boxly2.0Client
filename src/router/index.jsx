import { Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "../pages/Home/Home.jsx";
import { Login } from "../pages/Login/Login.jsx";
import { Register } from "../pages/Register/Register.jsx";
import { NotFound } from "../pages/NotFound/NotFound.jsx";
import { UserProfile } from "@/pages/UserProfile/UserProfile.jsx";
import { RequireAuth } from "@/utils/RequireAuth/RequireAuth.jsx";
import { Welcome } from "@/pages/Welcome/Welcome.jsx";
import { MeTest } from "@/pages/MeTest/MeTest.jsx";
import { Profile } from "@/pages/Profile/Profile.jsx";

export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USER_PROFILE: "/profile",
  WELCOME: "/welcome",
  USER_ME: "/me",
};

export const routes = () => (
  <Routes>
    <Route path={"/"} element={<Home />}></Route>
    <Route path={"/login"} element={<Login />}></Route>
    <Route path={"/register"} element={<Register />}></Route>
    <Route path={"/user-profile"} element={<UserProfile />}></Route>
    <Route path={"*"} element={<NotFound />}></Route>
    <Route element={<RequireAuth />}>
      <Route path={"/welcome"} element={<Welcome />}></Route>
      <Route path={"/me"} element={<MeTest />}></Route>
      <Route path={"/profile"} element={<Profile />}></Route>
    </Route>
  </Routes>
);
