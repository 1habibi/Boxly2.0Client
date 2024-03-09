import { Button, Drawer, Layout } from "antd";
const { Header, Footer, Content } = Layout;
import s from "./App.module.scss";
import React, { useEffect, useState } from "react";
import { Logo } from "@/copmonents/Logo/Logo.jsx";
import { AppMenu } from "@/copmonents/AppMenu/AppMenu.jsx";
import { LoginGroup } from "@/copmonents/LoginGroup/LoginGroup.jsx";
import { routes } from "@/router/index.jsx";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout className={s.appLayout}>
      <Header className={s.header}>
        <Logo></Logo>
        {windowWidth < 768 ? (
          <>
            <Button type="primary" onClick={showDrawer}>
              ☰
            </Button>
            <Drawer
              title={<LoginGroup></LoginGroup>}
              placement="left"
              onClose={onClose}
              open={visible}
            >
              <AppMenu mode={"vertical"}></AppMenu>
            </Drawer>
          </>
        ) : (
          <>
            <AppMenu></AppMenu>
            <LoginGroup></LoginGroup>
          </>
        )}
      </Header>
      <Content className={s.content}>{routes()}</Content>
      <Footer className={s.footer}>Boxly ©2024 Created by habibi</Footer>
    </Layout>
  );
}

export default App;
