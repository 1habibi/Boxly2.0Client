import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useState } from "react";

const DeleteOrderButton = ({ handleDeleteOrderConfirm, type = "primary" }) => {
	const [showConfirmPopover, setShowConfirmPopover] = useState(false);

	const handleOnOrderDelete = () => {
		setShowConfirmPopover(true);
	};

	const handleDeleteOrderCancel = () => {
		setShowConfirmPopover(false);
	};

	return (
		<div>
			<Button onClick={handleOnOrderDelete} type={type} danger>
				Отменить заказ <DeleteOutlined />
			</Button>
			<Popover
				title="Подтвердите удаление заказа"
				content={
					<div>
						<p>Вы уверены что хотите отменить заказ?</p>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								columnGap: "10px"
							}}
						>
							<Button
								onClick={() => {
									handleDeleteOrderConfirm();
									setShowConfirmPopover(false);
								}}
								type="primary"
								danger
							>
								Да
							</Button>
							<Button onClick={handleDeleteOrderCancel}>Нет</Button>
						</div>
					</div>
				}
				trigger="click"
				placement="topRight"
				open={showConfirmPopover}
				onOpenChange={setShowConfirmPopover}
			>
				<span />
			</Popover>
		</div>
	);
};

export default DeleteOrderButton;
