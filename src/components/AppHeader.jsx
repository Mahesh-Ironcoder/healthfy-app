import React, { useContext } from "react";

import { useHistory, useLocation, NavLink } from "react-router-dom";

import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
	IconButton,
	Link,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../App";
import { BluetoothDeviceContext } from "../contexts/BluetoothDeviceContext";

const useStyles = makeStyles((theme) => {
	return {
		title: {
			flex: 1,
		},
		navlink: {
			color: theme.palette.primary.contrastText,
			marginRight: "10px",
			padding: "10px",
			minWidth: "80px",
			textDecoration: "none",
			textAlign: "center",
			"&:hover": {
				border: "1px solid white",
			},
		},
		navlinkActive: {
			color: theme.palette.primary.contrastText,
			marginRight: "10px",
			padding: "10px",
			minWidth: "80px",
			textDecoration: "none",
			textAlign: "center",
			backgroundColor: "rgba(255, 255, 255, 0.5)",
			borderRadius: "10px",
			"&:hover": {
				border: "1px solid white",
			},
		},
	};
});

function AppHeader() {
	const classes = useStyles();
	const { isLogin, logout } = useContext(AuthContext);
	const location = useLocation();

	const { pathname } = location;

	const splitLocation = pathname.split("/");
	const { handleDrawerOpen } = useContext(AppContext);
	// const { disconnect } = useContext(BluetoothDeviceContext);
	let history = useHistory();
	const handleLogout = () => {
		logout();
		// disconnect();
	};
	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={handleDrawerOpen}
					edge='start'
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h4' className={classes.title}>
					Healthfy
				</Typography>
				{isLogin ? (
					<>
						<Link
							className={
								splitLocation[1] === ""
									? classes.navlinkActive
									: classes.navlink
							}
							underline='none'
							href='/'
						>
							Dashboard
						</Link>
						<Link
							className={
								splitLocation[1] === "diet"
									? classes.navlinkActive
									: classes.navlink
							}
							underline='none'
							href='/diet'
						>
							Diet
						</Link>
						<Link
							className={
								splitLocation[1] === "devices"
									? classes.navlinkActive
									: classes.navlink
							}
							underline='none'
							href='/devices'
						>
							Devices
						</Link>
					</>
				) : null}
				<Button
					variant='contained'
					onClick={() => {
						isLogin ? handleLogout() : history.push("/");
					}}
				>
					{isLogin ? "Log out" : "Login"}
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default AppHeader;
