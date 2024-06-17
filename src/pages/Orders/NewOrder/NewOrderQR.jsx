import { usePostOrderQrMutation } from "@/features/order/orderApiSlice";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Progress, Row, notification } from "antd";
import { IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BlockBackground } from "@/utils/BlockBackground/BlockBackground";

const NewOrderQR = () => {
	const ikUploadRefTest = useRef(null);
	const [postOrderQr] = usePostOrderQrMutation();
	const navigate = useNavigate();
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const onUploadProgress = progress => {
		const percentCompleted = Math.round(
			(progress.loaded / progress.total) * 100
		);
		setUploadProgress(percentCompleted);
	};

	const onError = () => {
		notification.error({
			message: "Ошибка",
			description: "Произошла ошибка при загрузке штрихкода."
		});
		setUploadProgress(0);
	};

	const onUploadStart = () => {
		setUploadProgress(0); // Обнуляем прогресс при начале загрузки
		setIsUploading(true); // Установить состояние загрузки как начатое
	};

	const onSuccess = async res => {
		console.log("Успех", res);
		try {
			await postOrderQr(res.url);
			notification.success({
				message: "Успех",
				description: "Штрихкод успешно загружен"
			});
			navigate("/orders");
		} catch (error) {
			console.error("Ошибка загрузки qr кода:", error);
			notification.error({
				message: "Ошибка",
				description: "Произошла ошибка при загрузке штрихкода."
			});
		}
	};

	return (
		<Row align={"middle"} justify={"center"}>
			<Col span={24}>
				<BlockBackground>
					<h1>Загрузка штрих-кода</h1>
					<p>
						Если вы уже сделали заказ вручную и он прибыл на наш пункт выдачи -
						загрузите штрих-код в форму ниже
					</p>
					<IKUpload
						validateFile={file => file.size < 50000000}
						useUniqueFileName={true}
						onSuccess={onSuccess}
						onError={onError}
						onUploadStart={onUploadStart}
						onUploadProgress={onUploadProgress}
						style={{ display: "none" }}
						ref={ikUploadRefTest}
					/>
					{ikUploadRefTest && (
						<Button
							icon={<UploadOutlined />}
							onClick={() => ikUploadRefTest.current.click()}
						>
							Загрузить
						</Button>
					)}
					{isUploading && <Progress percent={uploadProgress} />}
				</BlockBackground>
			</Col>
		</Row>
	);
};

export default NewOrderQR;
