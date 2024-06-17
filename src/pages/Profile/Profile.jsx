import { ChangeEmailForm } from "./ChangeEmailForm/ChangeEmailForm";
import { ChangePasswordForm } from "./ChangePasswordForm/ChangePasswordForm";
import { TelegramLoginButton } from "@/copmonents/TelegramLoginButton/TelegramLoginButton.jsx";
import {
	useCreateProfileMutation,
	useEditProfileMutation,
	useGetCurrentProfileQuery,
	useGetCurrentUserQuery,
	useUnlinkTelegramMutation
} from "@/features/auth/authApiSlice.js";
import {
	useEditUserMutation,
	useEditUserPasswordMutation
} from "@/features/users/userApiSlice";
import { ProfileForm } from "@/pages/Profile/ProfileForm/ProfileForm.jsx";
import { Button, Col, Row, notification, theme } from "antd";
import moment from "moment";
import { useState } from "react";

import { BlockBackground } from "@/utils/BlockBackground/BlockBackground";

const { useToken } = theme;

export const Profile = () => {
	const { token } = useToken();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editUser, { isLoading: isEditLoading }] = useEditUserMutation();
	const [editUserPassword, { isLoading: isEditPasswordLoading }] =
		useEditUserPasswordMutation();
	const { data: user } = useGetCurrentUserQuery();
	const { data: profile, isLoading } = useGetCurrentProfileQuery(user.id);
	const [createProfile] = useCreateProfileMutation();
	const [editProfile] = useEditProfileMutation();
	const [unlinkTelegram] = useUnlinkTelegramMutation();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	const handleEditUserPassword = async passwordData => {
		const id = user?.id;
		try {
			await editUserPassword({ passwordData, id }).unwrap();
			notification.success({
				message: "Успех",
				description: "Пароль изменен"
			});
		} catch (e) {
			notification.error({
				message: "Ошибка",
				description: `${e.data.message}`
			});
		}
	};

	const handleEditUser = async userData => {
		const id = user?.id;
		try {
			await editUser({ userData, id }).unwrap();
			notification.success({
				message: "Успех",
				description: "Почта обновлена"
			});
		} catch (e) {
			notification.error({
				message: "Ошибка",
				description: `${e.data.message}`
			});
		}
	};

	const handleProfileSubmit = async (profileData, id) => {
		setIsSubmitting(true);
		try {
			if (id) {
				await editProfile({ profileData, id }).unwrap();
				notification.success({
					message: "Успех",
					description: "Профиль успешно отредактирован"
				});
			} else {
				await createProfile(profileData).unwrap();
				notification.success({
					message: "Успех",
					description: "Профиль успешно создан"
				});
			}
		} catch (e) {
			console.error("Ошибка сохранения профиля: ", e);
			notification.error({
				message: "Ошибка",
				description: "Произошла ошибка при сохранении профиля."
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUnlinkTelegram = async () => {
		setIsSubmitting(true);
		try {
			await unlinkTelegram().unwrap();
			notification.success({
				message: "Успех",
				description: "Telegram профиль успешно отвязан."
			});
		} catch (e) {
			console.error("Ошибка отвязки: ", e);
			notification.error({
				message: "Ошибка",
				description: "Произошла ошибка при отвязке Telegram."
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<BlockBackground>
				<p
					style={{ fontSize: "30px", margin: "0 0 30px 0", fontWeight: "500" }}
				>
					Реквизиты для доставки
				</p>
				<ProfileForm
					onFinish={profileData => {
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
									phoneNumber: profile.phoneNumber
							  }
							: {}
					}
					isSubmitting={isSubmitting}
				/>
			</BlockBackground>
			<BlockBackground>
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
			</BlockBackground>
			<BlockBackground>
				<p style={{ fontSize: "24px", margin: "0 0 10px 0" }}>Почта и пароль</p>
				<Row>
					<Col span={9}>
						<ChangeEmailForm
							isLoading={isEditLoading}
							onFinish={handleEditUser}
						/>
					</Col>
					<Col span={6}></Col>
					<Col span={9}>
						<ChangePasswordForm
							isLoading={isEditPasswordLoading}
							onFinish={handleEditUserPassword}
						/>
					</Col>
				</Row>
			</BlockBackground>
		</div>
	);
};
