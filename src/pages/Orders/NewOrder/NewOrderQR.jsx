import React from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { usePostOrderQrMutation } from "@/features/order/orderApiSlice";

const NewOrderQR = () => {
  const [postOrderQr] = usePostOrderQrMutation();

  const onError = (err) => {
    console.log("Ошибка", err);
  };

  const onSuccess = async (res) => {
    console.log("Успех", res);
    try {
      await postOrderQr(res.url);
    } catch (error) {
      console.error("Ошибка загрузки qr кода:", error);
    }
  };

  return (
    <div>
      <IKImage path="default-image.jpg" width="400"></IKImage>
      <IKUpload
        fileName="test-upload.jpg"
        onError={onError}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default NewOrderQR;
