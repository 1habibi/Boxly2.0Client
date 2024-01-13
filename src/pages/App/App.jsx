import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
import s from "./App.module.scss";
import Logo from "@/copmonents/Logo/index.js";
import React from "react";
import { AppMenu } from "@/copmonents/AppMenu/index.js";
import { LoginGroup } from "@/copmonents/LoginGroup/index.js";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login/Login.jsx";
import { Home } from "@/pages/Home/Home.jsx";
import { routes } from "@/router/index.jsx";

function App() {
  return (
    <Layout className={s.appLayout}>
      <Header className={s.header}>
        <Logo></Logo>
        <AppMenu></AppMenu>
        <LoginGroup></LoginGroup>
      </Header>
      <Content
        style={{
          backgroundColor: "lightblue",
          height: "100vh",
        }}
      >
        {routes()}
      </Content>
      <Footer>FOOTER</Footer>
    </Layout>
  );
}

export default App;
