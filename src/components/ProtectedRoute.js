import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
	const { isLogin } = React.useContext(AuthContext);

	// React.useEffect(() => {
	// 	console.log("Protected Route rendered: ");
	// });

	return (
		<Route
			{...rest}
			render={(props) => {
				// console.log("Props from protectedRoute render: ", props);
				return isLogin ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				);
			}}
		/>
	);
};

export default ProtectedRoute;
