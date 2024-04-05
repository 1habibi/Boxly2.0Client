import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useGetOrderByIdWithItemsQuery } from "@/features/order/orderApiSlice.js";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOrderByIdWithItemsQuery(id);
  const currentUser = useSelector(selectCurrentUser);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Произошла ошибка загрузки данных</div>;

  if (!data || (currentUser && data.customerId !== currentUser.id)) {
    return <Navigate to="/orders" />;
  }

  return (
    <div>
      {JSON.stringify(data)}
      <h2>Детали заказа №{data.id}</h2>
      <div>
        <strong>Промокод:</strong> {data.promo}
      </div>
      <div>
        <strong>Delivery Type:</strong> {data.deliveryType}
      </div>
      <div>
        <strong>Цена:</strong> {data.price ? `$${data.price}` : "Ожидает..."}
      </div>
      <div>
        <strong>Товары:</strong>
        <ul>
          {data.items.map((item, index) => (
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
        <strong>Status:</strong> {data.status || "Not available"}
      </div>
    </div>
  );
};

export default OrderDetails;
