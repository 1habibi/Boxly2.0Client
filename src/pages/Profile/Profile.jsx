import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, message, theme } from "antd";
import moment from "moment";
const { useToken } = theme;
import {
  useCreateProfileMutation,
  useEditProfileMutation,
  useUnlinkTelegramMutation,
} from "@/features/auth/authApiSlice.js";
import { selectCurrentProfile } from "@/features/auth/authSlice.js";
import { ProfileForm } from "@/pages/Profile/ProfileForm/ProfileForm.jsx";
import { TelegramLoginButton } from "@/copmonents/TelegramLoginButton/TelegramLoginButton.jsx";

export const Profile = () => {
  const { token } = useToken();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const profile = useSelector(selectCurrentProfile);
  const [createProfile] = useCreateProfileMutation();
  const [editProfile] = useEditProfileMutation();
  const [unlinkTelegram] = useUnlinkTelegramMutation();

  const handleProfileSubmit = async (profileData, id) => {
    setIsSubmitting(true);
    try {
      if (id) {
        await editProfile({ profileData, id }).unwrap();
        message.success("Профиль успешно отредактирован.");
      } else {
        await createProfile(profileData).unwrap();
        message.success("Профиль успешно создан.");
      }
    } catch (e) {
      console.error("Ошибка сохранения профиля: ", e);
      message.error("Произошла ошибка при сохранении профиля.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnlinkTelegram = async () => {
    setIsSubmitting(true);
    try {
      await unlinkTelegram().unwrap();
      message.success("Telegram профиль успешно отвязан.");
    } catch (e) {
      console.error("Ошибка отвязки: ", e);
      message.error("Произошла ошибка при отвязке Telegram.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Ваш профиль</h1>
      <div
        style={{
          margin: "0 auto",
          borderRadius: "20px",
          padding: "10px 30px",
          marginBottom: "30px",
        }}
      >
        <p style={{ fontSize: "24px", margin: "0 0 10px 0" }}>
          Реквизиты для доставки
        </p>
        <ProfileForm
          onFinish={(profileData) => {
            handleProfileSubmit(profileData, profile ? profile.id : null);
          }}
          initialValues={
            profile
              ? {
                  name: profile.name,
                  surname: profile.surname,
                  patronymic: profile.patronymic,
                  gender: profile.gender,
                  birthday: moment(profile.birthday),
                  address: profile.address,
                  phoneNumber: profile.phoneNumber,
                }
              : {}
          }
          isSubmitting={isSubmitting}
        />
      </div>
      <div
        style={{
          margin: "0 auto",
          borderRadius: "30px",
          padding: "10px 30px",
        }}
      >
        <p style={{ fontSize: "24px", margin: "0 0 10px 0" }}>
          Привязка к Telegram
        </p>
        <p>
          Привяжите свой профиль в Telegram к нашему сайту и получайте новости и
          уведомления о доставке.
        </p>
        {!profile?.telegramId ? (
          <TelegramLoginButton></TelegramLoginButton>
        ) : (
          <>
            <p style={{ fontSize: "16px", color: token.colorInfo }}>
              Ваш аккаунт уже привязан к Telegram
            </p>
            <Button onClick={handleUnlinkTelegram} danger>
              Отвязать Telegram
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
