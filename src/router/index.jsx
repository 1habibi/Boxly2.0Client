import { Route, Routes } from "react-router-dom";
import React from "react";
import { Home } from "@/pages/Home/Home.jsx";
import { Login } from "@/pages/Login/Login.jsx";
import { Register } from "@/pages/Register/Register.jsx";
import { NotFound } from "@/pages/NotFound/NotFound.jsx";
import { Profile } from "@/pages/Profile/Profile.jsx";
import { MyOrders } from "@/pages/Orders/MyOrders/MyOrders.jsx";
import NewOrder from "@/pages/Orders/NewOrder/NewOrder";
import OrderDetails from "@/pages/Orders/OrderDetails/OrderDetails";
import NewOrderQR from "@/pages/Orders/NewOrder/NewOrderQR";
import { RequireAuth } from "@/utils/RequireAuth/RequireAuth";
import { RequireAdmin } from "@/utils/RequireAuth/RequireAdmin";
import AdminLayout from "@/pages/Admin/AdminLayout";
import Dashboard from "@/pages/Admin/Dashboard";
import Users from "@/pages/Admin/Users";

export const PATH = {
	HOME: "/",
	LOGIN: "/login",
	REGISTER: "/register",
	USER_PROFILE: "/profile",
	MY_ORDERS: "/orders",
	NEW_ORDER: "/orders/new",
	NEW_ORDER_QR: "/orders/new/qr",
	ORDER_DETAILS: "/orders/:id",
	ADMIN_DASHBOARD: "/admin/dashboard",
	ADMIN_USERS: "/admin/users"
};

export const routes = () => (
	<Routes>
		<Route path={PATH.HOME} element={<Home />} />
		<Route path={PATH.LOGIN} element={<Login />} />
		<Route path={PATH.REGISTER} element={<Register />} />
		<Route path="*" element={<NotFound />} />
		<Route element={<RequireAuth />}>
			<Route path={PATH.USER_PROFILE} element={<Profile />} />
			<Route path={PATH.MY_ORDERS} element={<MyOrders />} />
			<Route path={PATH.NEW_ORDER} element={<NewOrder />} />
			<Route path={PATH.NEW_ORDER_QR} element={<NewOrderQR />} />
			<Route path={PATH.ORDER_DETAILS} element={<OrderDetails />} />
			<Route element={<RequireAdmin />}>
				<Route element={<AdminLayout />}>
					<Route path={PATH.ADMIN_DASHBOARD} element={<Dashboard />}></Route>
					<Route path={PATH.ADMIN_USERS} element={<Users />}></Route>
				</Route>
			</Route>
		</Route>
	</Routes>
);
