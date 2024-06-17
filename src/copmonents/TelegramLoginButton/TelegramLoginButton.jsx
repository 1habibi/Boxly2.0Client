import { useLinkTelegramMutation } from "@/features/auth/authApiSlice.js";
import { useEffect, useRef } from "react";

export const TelegramLoginButton = () => {
	const telegramWrapperRef = useRef(null);
	const [linkTelegram] = useLinkTelegramMutation();

	useEffect(() => {
		const script = document.createElement("script");
		script.async = true;
		script.src = "https://telegram.org/js/telegram-widget.js?22";
		script.setAttribute("data-telegram-login", "boxly_bot");
		script.setAttribute("data-size", "medium");
		script.setAttribute("data-onauth", "onTelegramAuth(user)");
		script.setAttribute("data-userpic", "false");
		script.setAttribute("data-request-access", "write");
		telegramWrapperRef.current?.appendChild(script);

		window.onTelegramAuth = async function (user) {
			console.log(JSON.stringify(user));
			await linkTelegram(user).unwrap();
		};
	}, []);

	return <div ref={telegramWrapperRef} id="telegram-login-button"></div>;
};
