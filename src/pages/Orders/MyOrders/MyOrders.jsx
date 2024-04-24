import React, { useState } from "react";
import { Table, theme, Tooltip } from "antd";
import { useGetUserOrdersQuery } from "@/features/order/orderApiSlice.js";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { PATH } from "@/router/index.jsx";
import OrderModal from "@/pages/Orders/OrderModal/OrderModal.jsx";
import s from "./MyOrders.module.scss";
import {
  useGetCurrentProfileQuery,
  useGetCurrentUserQuery,
} from "@/features/auth/authApiSlice.js";
import Icon, { QuestionCircleOutlined } from "@ant-design/icons";
const { useToken } = theme;

export const MyOrders = () => {
  const { data: user } = useGetCurrentUserQuery();
  const { data: profile } = useGetCurrentProfileQuery(user.id);
  const { data: orders, error, isLoading } = useGetUserOrdersQuery(user.id);
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useToken();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || !orders) {
    return <div>Произошла ошибка загрузки данных</div>;
  }

  if (orders.length === 0 && profile) {
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

  if (!profile) {
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

  const statusDescription = (
    <div style={{ color: "black" }}>
      <p>
        <span className={`${s.unknown} ${s.orderStatusTooltip}`}>
          Неизвестно
        </span>{" "}
        - вы только сделали заказ и администратор еще не определил его статус.
      </p>
      <p>
        <span className={`${s.inWay} ${s.orderStatusTooltip}`}>В пути</span> -
        товар отправлен и находится в пути.
      </p>
      <p>
        <span className={`${s.arrived} ${s.orderStatusTooltip}`}>
          Доставлен на пункт выдачи
        </span>{" "}
        - товар прибыл в пункт назначения. Вы уже можете его получить!
      </p>
      <p>
        <span className={`${s.completed} ${s.orderStatusTooltip}`}>
          Получен
        </span>{" "}
        - заказ выдан.
      </p>
      <p>
        <span className={`${s.cancelled} ${s.orderStatusTooltip}`}>
          Отменен
        </span>{" "}
        - заказ отменён.
      </p>
      <p>
        <span className={`${s.waitingAnswer} ${s.orderStatusTooltip}`}>
          Ожидает ответа
        </span>{" "}
        - администратор обработал заказ и ожидает вашего ответа.
      </p>
    </div>
  );

  const columns = [
    {
      title: "Номер заказа",
      dataIndex: "id",
      key: "id",
      render: (text) => <p className={s.orderDetail}>{text}</p>,
    },
    {
      title: (
        <>
          Статус{" "}
          <Tooltip
            overlayInnerStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "30px",
            }}
            placement={"rightTop"}
            title={statusDescription}
          >
            <QuestionCircleOutlined style={{ marginLeft: 5 }} />
          </Tooltip>
        </>
      ),
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Неизвестно", value: "Неизвестно" },
        { text: "В пути", value: "В пути" },
        {
          text: "Доставлен на пункт выдачи",
          value: "Доставлен на пункт выдачи",
        },
        { text: "Получен", value: "Получен" },
        { text: "Отменен", value: "Отменен" },
        { text: "Ожидает ответа", value: "Ожидает ответа" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
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
