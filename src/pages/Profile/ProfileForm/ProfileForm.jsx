import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { HomeOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import InputMask from "react-input-mask";

export const ProfileForm = ({ onFinish, initialValues, isSubmitting }) => (
  <Form onFinish={onFinish} initialValues={initialValues} name="profile-form">
    <Form.Item name="name" label="Имя">
      <Input prefix={<UserOutlined />} />
    </Form.Item>
    <Form.Item name="surname" label="Фамилия">
      <Input prefix={<UserOutlined />} />
    </Form.Item>
    <Form.Item name="patronymic" label="Отчество">
      <Input prefix={<UserOutlined />} />
    </Form.Item>
    <Form.Item label="Пол" name="gender">
      <Select>
        <Select.Option value={"Мужской"}>Мужской</Select.Option>
        <Select.Option value={"Женский"}>Женский</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="Дата рождения" name="birthday">
      <DatePicker
        disabledDate={(current) => {
          return current && current > dayjs().subtract(14, "year").endOf("day");
        }}
      />
    </Form.Item>
    <Form.Item name="address" label="Адрес">
      <Input prefix={<HomeOutlined />} />
    </Form.Item>
    <Form.Item name="phoneNumber" label="Номер телефона">
      <InputMask mask="+7 (999) 999-99-99" maskChar="_">
        {() => <Input prefix={<PhoneOutlined />} />}
      </InputMask>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        {isSubmitting ? "Сохранение..." : "Сохранить"}
      </Button>
    </Form.Item>
  </Form>
);
