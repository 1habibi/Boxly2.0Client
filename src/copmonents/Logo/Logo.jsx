import React from "react";
import s from "./Logo.module.scss";

export const Logo = () => {
  return <img className={s.logo} src="/logo.svg" alt="logo" />;
};
