import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
import s from "./App.module.scss";
import Logo from "@/copmonents/Logo/index.js";
import React from "react";
import { AppMenu } from "@/copmonents/AppMenu/index.js";
import { LoginGroup } from "@/copmonents/LoginGroup/index.js";

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
        CONTENT
      </Content>
      <Footer>FOOTER</Footer>
    </Layout>
  );
}

export default App;
