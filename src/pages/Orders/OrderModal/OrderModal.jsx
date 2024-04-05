import React from "react";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { PATH } from "@/router/index.jsx";
import { BarcodeOutlined, FileAddOutlined } from "@ant-design/icons";

const OrderModal = ({ modalOpen, closeModal }) => (
  <Modal
    title="Выберите способ оформления заказа"
    centered
    open={modalOpen}
    onCancel={closeModal}
    footer={null}
    width={"1000px"}
  >
    <p>Хотите сделать заказ с нашей помощью или ваш заказ уже прибыл?</p>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: "20px",
      }}
    >
      <Link
        to={PATH.NEW_ORDER}
        style={{
          width: "100%",
          height: "100%",
          textDecoration: "none",
        }}
      >
        <Button
          style={{
            width: "100%",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            alignItems: "center",
          }}
        >
          <FileAddOutlined style={{ fontSize: "54px" }} />
          <span style={{ fontSize: "34px" }}>Новый заказ</span>
        </Button>
      </Link>
      <Link
        to={PATH.NEW_ORDER_QR}
        style={{
          width: "100%",
          height: "100%",
          textDecoration: "none",
        }}
      >
        <Button
          style={{
            width: "100%",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            alignItems: "center",
          }}
        >
          <BarcodeOutlined style={{ fontSize: "54px" }} />
          <span style={{ fontSize: "34px" }}>Загрузить штрих-код</span>
        </Button>
      </Link>
    </div>
  </Modal>
);

export default OrderModal;
