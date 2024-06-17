import NewUsersChart from "./StatisticsCharts/NewUsersChart";
import OrdersRatingChart from "./StatisticsCharts/OrderRatingChart";
import OrdersCountChart from "./StatisticsCharts/OrdersCountChart";
import { useGetAllOrdersQuery } from "@/features/order/orderApiSlice";
import { useGetAllUsersQuery } from "@/features/users/userApiSlice";
import { Col, Row } from "antd";

import { BlockBackground } from "@/utils/BlockBackground/BlockBackground";

export default function Dashboard() {
	const { data: users, isLoading: isUsersLoading } = useGetAllUsersQuery();
	const { data: orders, isLoading: isOrdersLoading } = useGetAllOrdersQuery();
	if (isUsersLoading || isOrdersLoading) return <div>LOADING</div>;

	return (
		<>
			<Row gutter={[24, 24]} justify={"center"} align={"middle"}>
				<Col sm={24} md={24} lg={24} xxl={12}>
					<BlockBackground>
						<NewUsersChart users={users} />
					</BlockBackground>
					<BlockBackground>
						<OrdersCountChart orders={orders} />
					</BlockBackground>
				</Col>
				<Col sm={24} md={24} lg={24} xxl={12}>
					<BlockBackground>
						<OrdersRatingChart orders={orders} />
					</BlockBackground>
				</Col>
			</Row>
			<Row></Row>
		</>
	);
}
