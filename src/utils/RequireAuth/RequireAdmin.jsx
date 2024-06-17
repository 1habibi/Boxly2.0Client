import { useGetCurrentUserQuery } from "@/features/auth/authApiSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAdmin = () => {
	const { data: user } = useGetCurrentUserQuery();
	const location = useLocation();

	return user.roles.includes("ADMIN") ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
};
