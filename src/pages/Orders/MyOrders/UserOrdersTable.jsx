import s from "./MyOrders.module.scss";
import { PATH } from "@/router/paths";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";

import s_orderStatus from "@/utils/OrderStatus.module.scss";
import { ORDER_STATUSES } from "@/utils/OrderStatuses";
import { StatusDescription } from "@/utils/StatusDescription/StatusDescription";

const UserOrdersTable = ({ orders }) => {
	const columns = [
		{
			title: "Номер заказа",
			dataIndex: "id",
			key: "id",
			render: text => <p className={s.orderDetail}>{text}</p>
		},
		{
			title: (
				<>
					Статус{" "}
					<Tooltip
						overlayInnerStyle={{
							backgroundColor: "rgba(255, 255, 255, 0.95)",
							borderRadius: "30px"
						}}
						placement={"rightTop"}
						title={<StatusDescription />}
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
					value: "Доставлен на пункт выдачи"
				},
				{ text: "Получен", value: "Получен" },
				{ text: "Отменен", value: "Отменен" },
				{ text: "Ожидает ответа", value: "Ожидает ответа" }
			],
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			render: text => (
				<p
					style={{
						fontWeight: "bold"
					}}
					className={`${s.orderDetail} ${
						text === null
							? s_orderStatus.unknown
							: text === ORDER_STATUSES.WAITING_ANSWER
							  ? s_orderStatus.waitingAnswer
							  : text === ORDER_STATUSES.IN_WAY
							    ? s_orderStatus.inWay
							    : text === ORDER_STATUSES.ARRIVED
							      ? s_orderStatus.arrived
							      : text === ORDER_STATUSES.CANCELLED
							        ? s_orderStatus.cancelled
							        : text === ORDER_STATUSES.COMPLETED
							          ? s_orderStatus.completed
							          : ""
					}`}
				>
					{text}
				</p>
			)
		},
		{
			title: "Дата",
			dataIndex: "createdAt",
			key: "createdAt",
			sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
			defaultSortOrder: "desc",
			render: text => <p className={s.orderDetail}>{text.slice(0, 10)}</p>
		},
		{
			title: "Цена",
			dataIndex: "price",
			key: "price",
			render: text => <p className={s.orderDetail}>{text}</p>
		},
		{
			title: "Действие",
			key: "action",
			render: (text, record) => (
				<Link to={PATH.ORDER_DETAILS.replace(":id", record.id)}>
					<Button type="dashed">Подробнее</Button>
				</Link>
			)
		}
	];

	return (
		<Table
			dataSource={orders.slice().reverse()}
			columns={columns}
			pagination={{
				pageSize: 10, // number of items per page
				total: orders.length, // total number of items
				showTotal: (total, range) =>
					`${range[0]}-${range[1]} из ${total} заказов` // show range of items
			}}
			rowKey="id"
			style={{ marginTop: "20px", overflowX: "auto" }}
		/>
	);
};

export default UserOrdersTable;
