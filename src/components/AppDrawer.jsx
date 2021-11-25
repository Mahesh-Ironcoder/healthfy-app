import React from "react";
import { Drawer, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => {
	return {
		drawer: {
			width: 240,
		},
		drawerPaper: {
			width: 240,
		},
		drawerConatiner: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			padding: theme.spacing(2),
		},
		drawerItem: {
			width: "90%",
			padding: theme.spacing(2),
			margin: 2,
			"&:hover": {
				backgroundColor: theme.palette.primary,
				border: "1px solid black",
			},
		},
		closeBtn: {
			alignSelf: "flex-end",
			fontSize: 18,
			"&:hover": { cursor: "pointer" },
		},
		activeItem: {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
		},
	};
});

function AppDrawer(props) {
	const { open, onClose } = props;
	const classes = useStyles();
	return (
		<Drawer
			variant='persistent'
			anchor='left'
			open={open}
			className={classes.drawer}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			{/* <ClickAwayListener onClickAway={onClose}> */}
			<div className={classes.drawerConatiner}>
				<div onClick={onClose} className={classes.closeBtn}>
					X
				</div>
				<div className={classes.drawerItem}>
					<NavLink
						to='/'
						// activeClassName={classes.activeItem}
						// className={classes.drawerItem}
						style={{ fontSize: 18, textDecoration: "none" }}
						onClick={onClose}
					>
						Dashboard
					</NavLink>
				</div>
				<div className={classes.drawerItem}>
					<NavLink
						to='/diet'
						style={{ fontSize: 18, textDecoration: "none" }}
						onClick={onClose}
					>
						Diet
					</NavLink>
				</div>
				<div className={classes.drawerItem}>
					<NavLink
						to='/devices'
						style={{ fontSize: 18, textDecoration: "none" }}
						onClick={onClose}
					>
						Devices
					</NavLink>
				</div>
			</div>
			{/* </ClickAwayListener> */}
		</Drawer>
	);
}

export default AppDrawer;
