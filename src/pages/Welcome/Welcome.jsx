import React from "react";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/features/auth/authSlice.js";
import { useSelector } from "react-redux";
import { intersection } from "zod";
import { Link } from "react-router-dom";

export const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token}`;

  const content = (
    <div>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
    </div>
  );

  return content;
};
