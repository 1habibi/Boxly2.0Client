import { PATH } from "./paths";
import AdminLayout from "@/pages/Admin/AdminLayout/AdminLayout";
import Dashboard from "@/pages/Admin/Dashboard";
import Orders from "@/pages/Admin/Orders/Orders";
import Users from "@/pages/Admin/Users";
import AppLayout from "@/pages/App/AppLayout";
import { Home } from "@/pages/Home/Home.jsx";
import { Login } from "@/pages/Login/Login.jsx";
import { NotFound } from "@/pages/NotFound/NotFound.jsx";
import { MyOrders } from "@/pages/Orders/MyOrders/MyOrders.jsx";
import NewOrder from "@/pages/Orders/NewOrder/NewOrder";
import NewOrderQR from "@/pages/Orders/NewOrder/NewOrderQR";
import OrderDetails from "@/pages/Orders/OrderDetails/OrderDetails";
import { Profile } from "@/pages/Profile/Profile.jsx";
import { Register } from "@/pages/Register/Register.jsx";
import { Route, Routes } from "react-router-dom";

import { RequireAdmin } from "@/utils/RequireAuth/RequireAdmin";
import { RequireAuth } from "@/utils/RequireAuth/RequireAuth";

export const routes = () => (
	<Routes>
		<Route element={<AppLayout />}>
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
			</Route>
		</Route>
		<Route element={<RequireAuth />}>
			<Route element={<RequireAdmin />}>
				<Route element={<AdminLayout />}>
					<Route path={PATH.ADMIN_DASHBOARD} element={<Dashboard />}></Route>
					<Route path={PATH.ADMIN_USERS} element={<Users />}></Route>
					<Route path={PATH.ADMIN_ORDERS} element={<Orders />}></Route>
				</Route>
			</Route>
		</Route>
	</Routes>
);
