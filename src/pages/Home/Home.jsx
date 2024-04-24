import React from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Col, Row, theme } from "antd";
import { PATH } from "@/router/index.jsx";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { DownCircleOutlined } from "@ant-design/icons";
import s from "./Home.module.scss";
import {
  useGetCurrentProfileQuery,
  useGetCurrentUserQuery,
} from "@/features/auth/authApiSlice.js";
const { useToken } = theme;

export const Home = () => {
  const { token } = useToken();
  const { data: user } = useGetCurrentUserQuery();
  const { data: profile } = useGetCurrentProfileQuery(user?.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Row align={"middle"}>
        <Col span={24} style={{ marginTop: "20px" }}>
          {!profile && isAuthenticated ? (
            <div style={{ width: "60%", margin: "0 auto" }}>
              <Alert
                style={{ fontSize: "16px" }}
                message={`Ты еще не заполнили профиль. Пора это исправить!`}
                action={
                  <Link to={PATH.USER_PROFILE}>
                    <Button>Перейти</Button>
                  </Link>
                }
                type="info"
                showIcon
              />
            </div>
          ) : null}
        </Col>
      </Row>
      <Row
        justify={"center"}
        align={"middle"}
        style={{ marginBottom: "200px" }}
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} span={12}>
          <h1 style={{ fontSize: "64px", marginBottom: "5px" }}>
            Лучшая{" "}
            <span style={{ color: token.colorPrimary, fontWeight: "900" }}>
              доставка
            </span>{" "}
            в твоем городе
          </h1>
          <p style={{ fontSize: "24px", marginTop: "25px" }}>
            Делаем вашу жизнь проще уже 5 лет
          </p>
        </Col>
        <Col xs={0} sm={0} md={12} lg={12} xl={12} xxl={12} span={12}>
          <img src="./img/home_hero.svg" alt="home_hero" />
        </Col>
        <Row>
          <Col span={24} xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
            <ScrollLink to={"moveFromScroll"} smooth={true}>
              <DownCircleOutlined
                style={{ fontSize: "50px", color: token.colorPrimary }}
              />
            </ScrollLink>
          </Col>
        </Row>
      </Row>
      <Row id={"moveFromScroll"}>
        <Col
          span={24}
          justify={"center"}
          align={"middle"}
          style={{ marginBottom: "25px" }}
        >
          <h2 className={s.subtitle}>
            Что такое{" "}
            <span style={{ color: token.colorPrimary, fontWeight: "900" }}>
              Boxly?
            </span>
          </h2>
        </Col>
      </Row>
      <Row align={"middle"} justify={"center"}>
        <Col span={10} style={{ maxWidth: "50%" }}>
          <img
            style={{ maxWidth: "100%" }}
            src="./img/about/fast.svg"
            alt="fast_delivery"
          />
        </Col>
        <Col span={14}>
          <h3 className={s.aboutTitle}>Экономия времени и усилий</h3>
          <p style={{ fontSize: "18px" }}>
            Мы доставим ваш заказ быстро и безопасно, освободив вас от
            необходимости самостоятельно забирать товары или искать способы
            доставки напрямую.
          </p>
        </Col>
      </Row>
      <Row align={"middle"} justify={"center"}>
        <Col span={14}>
          <h3 className={s.aboutTitle}>Удобство и мобильность</h3>
          <p style={{ fontSize: "18px" }}>
            Заказывайте товары онлайн в любое удобное для вас время как на ПК,
            так и на смартфоне.
          </p>
        </Col>
        <Col span={10}>
          <img src="./img/about/easy_and_mobile.svg" alt="easy_and_mobile" />
        </Col>
      </Row>
      <Row align={"middle"} justify={"center"}>
        <Col span={10}>
          <img src="./img/about/enjoy.svg" alt="enjoy" />
        </Col>
        <Col span={14}>
          <h3 className={s.aboutTitle}>Наслаждение покупками</h3>
          <p style={{ fontSize: "18px" }}>
            Наш сервис позволяет вам покупать неограниченное количество товаров
            из различных магазинов и получать их в одной удобной доставке. Не
            задумывайтесь о сложностях оформления заказов - мы возьмем это на
            себя.
          </p>
        </Col>
      </Row>
      <Row align={"middle"} justify={"center"}>
        <Col span={14}>
          <h3 className={s.aboutTitle}>Безопасность</h3>
          <p style={{ fontSize: "18px" }}>
            Наша команда профессионалов обеспечит бережную обработку и доставку
            вашего заказа с соблюдением всех мер безопасности
          </p>
        </Col>
        <Col span={10}>
          <img src="./img/about/safety.svg" alt="safety" />
        </Col>
      </Row>
    </div>
  );
};
