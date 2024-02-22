import React, { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import moment from "moment";
import {
  useCreateProfileMutation,
  useEditProfileMutation,
} from "@/features/auth/authApiSlice.js";
import { selectCurrentProfile } from "@/features/auth/authSlice.js";
import { ProfileForm } from "@/pages/Profile/ProfileForm/ProfileForm.jsx";

export const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const profile = useSelector(selectCurrentProfile);
  const [createProfile] = useCreateProfileMutation();
  const [editProfile] = useEditProfileMutation();

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

  return (
    <div>
      <h1>Ваш профиль</h1>
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
  );
};
