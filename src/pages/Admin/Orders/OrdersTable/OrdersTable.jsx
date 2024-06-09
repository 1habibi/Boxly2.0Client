import s from "../Orders.module.scss";
import { DownOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Rate, Table, Tooltip } from "antd";

import s_orderStatus from "@/utils/OrderStatus.module.scss";
import { ORDER_STATUSES } from "@/utils/OrderStatuses";
import { StatusDescription } from "@/utils/StatusDescription/StatusDescription";

export const OrdersTable = ({ orders, handleClick }) => {
	const items = [{ label: "Редактировать", key: "order-edit" }];

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
			defaultFilteredValue: ["Неизвестно"],
			dataIndex: "status",
			key: "status",
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
			title: "Заказчик",
			dataIndex: "customer",
			key: "customerName",
			render: (text, record) => (
				<p
					className={s.orderDetail}
				>{`${record.customer.Profile.name} ${record.customer.Profile.surname}`}</p>
			)
		},
		{
			title: "Дата заказа",
			dataIndex: "createdAt",
			sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
			key: "createdAt",
			render: text => (
				<p>
					{new Date(text).toLocaleString("ru-RU", {
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						year: "numeric",
						month: "long",
						day: "numeric"
					})}
				</p>
			)
		},
		{
			title: "Дата обновления",
			dataIndex: "updatedAt",
			key: "updatedAt",
			sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
			render: text => (
				<p>
					{new Date(text).toLocaleString("ru-RU", {
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						year: "numeric",
						month: "long",
						day: "numeric"
					})}
				</p>
			)
		},
		{
			title: "Оценка",
			key: "rate",
			dataIndex: "rate",
			render: (text, record) => <Rate disabled defaultValue={text} />
		},
		{
			title: "Действия",
			key: "action",
			render: (text, record) => (
				<Dropdown
					menu={{
						onClick: e => handleClick(e, record),
						items: items
					}}
				>
					<Button>
						Действия <DownOutlined />
					</Button>
				</Dropdown>
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
				showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` // show range of items
			}}
			rowKey="id"
			style={{ marginTop: "20px", overflowX: "auto" }}
		/>
	);
};
