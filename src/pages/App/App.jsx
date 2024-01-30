import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
import s from "./App.module.scss";
import React from "react";
import { Logo } from "@/copmonents/Logo/Logo.jsx";
import { AppMenu } from "@/copmonents/AppMenu/AppMenu.jsx";
import { LoginGroup } from "@/copmonents/LoginGroup/LoginGroup.jsx";
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
