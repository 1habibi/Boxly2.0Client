import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetOrderByIdWithItemsQuery,
} from "@/features/order/orderApiSlice.js";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import {
  useGetCurrentProfileQuery,
  useGetCurrentUserQuery,
} from "@/features/auth/authApiSlice.js";
import { Button, notification } from "antd";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderByIdWithItemsQuery(id);
  const { data: currentUser } = useGetCurrentUserQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const navigate = useNavigate();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Произошла ошибка загрузки данных</div>;

  if (!order || (currentUser && order.customerId !== currentUser.id)) {
    return <Navigate to="/orders" />;
  }

  const handleOnOrderDelete = () => {
    try {
      deleteOrder(order.id);
      notification.success({
        message: "Успех",
        description: "Заказ успешно отменен.",
      });
      navigate("/orders");
    } catch (e) {
      notification.error({
        message: "Ошибка",
        description: "Произошла ошибка при отмене заказа.",
      });
    }
  };

  if (order.qr) {
    return (
      <div>
        <h2>Детали заказа №{order.id}</h2>
        <div>
          <strong>Status:</strong> {order.status || "Not available"}
        </div>
        <div>
          <img style={{ width: "20%" }} src={order.qr} alt="order_qr" />
        </div>
        <Button onClick={handleOnOrderDelete} type="primary" danger>
          Отменить заказ
        </Button>
      </div>
    );
  }

  return (
    <div>
      {JSON.stringify(order)}
      <h2>Детали заказа №{order.id}</h2>
      <div>
        <strong>Промокод:</strong> {order.promo}
      </div>
      <div>
        <strong>Delivery Type:</strong> {order.deliveryType}
      </div>
      <div>
        <strong>Цена:</strong> {order.price ? `$${order.price}` : "Ожидает..."}
      </div>
      <div>
        <strong>Товары:</strong>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <div>
                <strong>Ссылка:</strong>{" "}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </div>
              <div>
                <strong>Количество:</strong> {item.count}
              </div>
              <div>
                <strong>Примечание:</strong> {item.note}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Status:</strong> {order.status || "Not available"}
      </div>
      <Button onClick={handleOnOrderDelete} type="primary" danger>
        Отменить заказ
      </Button>
    </div>
  );
};

export default OrderDetails;
