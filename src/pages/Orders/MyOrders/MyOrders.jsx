import React, { useState } from "react";
import { Table, theme } from "antd";
import { useGetUserOrdersQuery } from "@/features/order/orderApiSlice.js";
import { useSelector } from "react-redux";
import {
  selectCurrentProfile,
  selectCurrentUser,
} from "@/features/auth/authSlice";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { PATH } from "@/router/index.jsx";
import OrderModal from "@/pages/Orders/OrderModal/OrderModal.jsx";
import s from "./MyOrders.module.scss";
import { selectOrders } from "@/features/order/orderSlice.js";
const { useToken } = theme;

export const MyOrders = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data, error, isLoading } = useGetUserOrdersQuery(currentUser.id);
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useToken();
  const orders = useSelector(selectOrders);
  const userProfile = useSelector(selectCurrentProfile);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || !orders) {
    return <div>Произошла ошибка загрузки данных</div>;
  }

  if (orders.length === 0 && userProfile) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ width: "35%" }}
          src="/img/not-found-orders.svg"
          alt="Заказов нет"
        />
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "40px",
              color: token.colorPrimary,
              fontWeight: "900",
              marginBottom: "10px",
            }}
          >
            Заказов еще нет!
          </p>
          <p style={{ fontSize: "20px" }}>
            Волнительный момент, но сейчас вы можете сделать свой{" "}
            <span
              style={{
                color: token.colorPrimary,
                fontWeight: "900",
                fontSize: "24px",
              }}
            >
              первый
            </span>
          </p>
          <Button
            style={{ marginTop: "10px" }}
            type="primary"
            size={"large"}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Новый заказ
          </Button>
          <OrderModal
            modalOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ width: "35%" }}
          src="/img/no-profile.svg"
          alt="Не заполнен профиль"
        />
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "40px",
              color: token.colorPrimary,
              fontWeight: "900",
              marginBottom: "10px",
            }}
          >
            Вы еще не заполнили профиль!
          </p>
          <p style={{ fontSize: "20px" }}>
            Не торопитесь, перед тем как сделать заказ нужно заполнить профиль
          </p>
          <Link to={PATH.USER_PROFILE}>
            <Button style={{ marginTop: "10px" }} size={"large"}>
              Мой профиль
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const columns = [
    {
      title: "Номер заказа",
      dataIndex: "id",
      key: "id",
      render: (text) => <p className={s.orderDetail}>{text}</p>,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <p
          style={{
            fontWeight: "bold",
          }}
          className={`${s.orderDetail} ${
            text === null
              ? s.unknown
              : text === "Ожидает ответа"
              ? s.waitingAnswer
              : text === "В пути"
              ? s.inWay
              : text === "Доставлен в пункт выдачи"
              ? s.arrived
              : text === "Отменен"
              ? s.cancelled
              : text === "Получен"
              ? s.completed
              : ""
          }`}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Дата",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p className={s.orderDetail}>{text.slice(0, 10)}</p>,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (text) => <p className={s.orderDetail}>{text}</p>,
    },
    {
      title: "Действие",
      key: "action",
      render: (text, record) => (
        <Link to={PATH.ORDER_DETAILS.replace(":id", record.id)}>
          <Button type="dashed">Подробнее</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      {JSON.stringify(orders)}
      <br />
      {JSON.stringify(userProfile)}
      <Table
        dataSource={orders.slice().reverse()}
        columns={columns}
        pagination={false}
        rowKey="id"
        style={{ marginTop: "20px" }}
      />
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        size={"large"}
        onClick={() => setModalOpen(true)}
      >
        Новый заказ
      </Button>
      <OrderModal
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </>
  );
};
