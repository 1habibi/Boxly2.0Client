import s from "./StatusDescription.module.scss";
import s_orderStatus from "@/utils/OrderStatus.module.scss";
export const StatusDescription = () => {
	return (
		<>
			<div style={{ color: "black" }}>
				<p>
					<span className={`${s_orderStatus.unknown} ${s.orderStatusTooltip}`}>
						Неизвестно
					</span>{" "}
					- вы только сделали заказ и администратор еще не определил его статус.
				</p>
				<p>
					<span className={`${s_orderStatus.inWay} ${s.orderStatusTooltip}`}>
						В пути
					</span>{" "}
					- товар отправлен и находится в пути.
				</p>
				<p>
					<span className={`${s_orderStatus.arrived} ${s.orderStatusTooltip}`}>
						Доставлен на пункт выдачи
					</span>{" "}
					- товар прибыл в пункт назначения. Вы уже можете его получить!
				</p>
				<p>
					<span
						className={`${s_orderStatus.completed} ${s.orderStatusTooltip}`}
					>
						Получен
					</span>{" "}
					- заказ выдан.
				</p>
				<p>
					<span
						className={`${s_orderStatus.cancelled} ${s.orderStatusTooltip}`}
					>
						Отменен
					</span>{" "}
					- заказ отменён.
				</p>
				<p>
					<span
						className={`${s_orderStatus.waitingAnswer} ${s.orderStatusTooltip}`}
					>
						Ожидает ответа
					</span>{" "}
					- администратор обработал заказ и ожидает вашего ответа.
				</p>
			</div>
		</>
	);
};
