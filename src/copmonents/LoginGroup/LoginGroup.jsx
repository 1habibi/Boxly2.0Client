import React from "react";
import { Button, Dropdown } from "antd";
import s from "./LoginGroup.module.scss";
import { Link } from "react-router-dom";
import { PATH } from "@/router/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/authSlice.js";

export const LoginGroup = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  if (isAuth && user) {
    return (
      <div className={s.loginGroup}>
        <div>
          <Dropdown
            menu={{
              items: [
                { label: <Link to={PATH.USER_PROFILE}>Профиль</Link>, key: 1 },
                {
                  label: (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(logOut());
                      }}
                    >
                      Выход
                    </a>
                  ),
                  key: 2,
                },
              ],
            }}
          >
            <Button style={{ fontWeight: "bold" }} size={"large"} type={"text"}>
              {user.email}
            </Button>
          </Dropdown>
        </div>
      </div>
    );
  }

  return (
    <div className={s.loginGroup}>
      <Link to={PATH.LOGIN}>
        <Button size="large" type={"primary"}>
          Войти
        </Button>
      </Link>
      <Link to={PATH.REGISTER}>
        <Button size={"large"}>Регистрация</Button>
      </Link>
    </div>
  );
};
