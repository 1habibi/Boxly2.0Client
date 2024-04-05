import React, { useState } from "react";
import { Form, Select, Input, InputNumber, Button, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useCreateOrderMutation } from "@/features/order/orderApiSlice.js";
import { useNavigate } from "react-router-dom";

const NewOrder = () => {
  const [form] = Form.useForm();
  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (data) => {
    setLoading(true);
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        data[key] = null;
      }
    });
    try {
      await createOrder(data);
      notification.success({
        message: "Успех!",
        description: "Заказ успешно создан!",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
      notification.error({
        message: "Ошибка!",
        description: "Ошибка создания заказа :(",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateItems = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value || value.length === 0) {
        reject("Добавьте хотя бы один товар!");
      } else {
        resolve();
      }
    });
  };

  return (
    <div>
      <h1>Новый заказ</h1>
      <div>
        <p>Заполните простую форму и оформите заказ просто!</p>
      </div>
      <Form
        style={{
          width: "80%",
          margin: "0 auto",
          borderRadius: "40px",
          background: "rgba(245, 245, 253, 0.3)",
          boxShadow: "5px 5px 13px #f0f0f8, -5px -5px 13px #fafaff",
          padding: "20px 40px",
          marginTop: "20px",
        }}
        onFinish={onFinish}
        name={"new-order-form"}
        form={form}
      >
        <Form.Item>
          <Form.List
            initialValue={[{ key: 0 }]}
            name="items"
            rules={[{ validator: validateItems }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div style={{ marginBottom: "20px" }} key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      label="Ссылка на товар"
                      rules={[{ required: true, message: "Обязательное поле" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "count"]}
                      label="Количество"
                      rules={[{ required: true, message: "Обязательное поле" }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "note"]}
                      label="Примечание"
                    >
                      <Input />
                    </Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => remove(name)}
                      icon={<MinusCircleOutlined />}
                    >
                      Удалить товар
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    Добавить товар
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={form.getFieldError("items")} />
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item>
          <Form.Item
            lable="Тип доставки"
            name="delivery_type"
            rules={[{ required: true, message: "Выберите тип заказа" }]}
          >
            <Select>
              <Select.Option value="Доставка">Доставка</Select.Option>
              <Select.Option value="Самовывоз">Самовывоз</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Промокод" name={"promo"}>
            <Input />
          </Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewOrder;
