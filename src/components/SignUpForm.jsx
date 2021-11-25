import {
	Box,
	Container,
	makeStyles,
	Paper,
	IconButton,
	Typography,
} from "@material-ui/core";
import React from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

// import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
// import CakeOutlinedIcon from "@material-ui/icons/CakeOutlined";
// import { ReactComponent as BmiIcon } from "../body-mass-index.svg";

// const useStyles = makeStyles((theme) => ({
// 	form: {
// 		// marginTop: theme.spacing(1),
// 		// marginBottom: theme.spacing(1),
// 		display: "flex",
// 		flexDirection: "column",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 	},
// 	textinputStyle: {
// 		width: "80%",
// 		// alignSelf: "flex-start",
// 	},
// 	nameStyle: {
// 		width: "50%",
// 		flex: 1,
// 	},
// }));

// function TextInput(props) {
// 	const {
// 		value,
// 		onTextChange,
// 		className,
// 		startIcon: MyIcon,
// 		...rest
// 	} = props;
// 	return (
// 		<div
// 			style={{
// 				display: "flex",
// 				flexDirection: "row",
// 				alignItems: "center",
// 			}}
// 			className={className}
// 		>
// 			{MyIcon && <MyIcon style={{ marginTop: 8 }} />}
// 			<TextField
// 				margin='normal'
// 				value={value}
// 				onChange={(e) => {
// 					onTextChange(e.target.value);
// 				}}
// 				variant='outlined'
// 				size='small'
// 				required
// 				color='secondary'
// 				style={{ marginLeft: 10 }}
// 				{...rest}
// 			/>
// 		</div>
// 	);
// }

// function MyBmiIcon() {
// 	return (
// 		<SvgIcon
// 			component={BmiIcon}
// 			style={{ stroke: "black", strokeWidth: 20 }}
// 			viewBox='0 0 600 476.6'
// 		/>
// 	);
// }

// function AccountDetails({ user, dispatch }) {
// 	const classes = useStyles();
// 	return (
// 		<Paper>
// 			<TextInput
// 				value={user.email}
// 				label='Email'
// 				type='email'
// 				onTextChange={(value) =>
// 					dispatch({ type: "setEmail", payload: value })
// 				}
// 				className={classes.textinputStyle}
// 				startIcon={AccountCircleOutlinedIcon}
// 				fullWidth
// 				autoComplete='email'
// 			/>
// 			<TextInput
// 				value={user.password}
// 				label='Password'
// 				type='password'
// 				onTextChange={(value) =>
// 					dispatch({ type: "setPassword", payload: value })
// 				}
// 				className={classes.textinputStyle}
// 				startIcon={LockOutlinedIcon}
// 				fullWidth
// 			/>
// 			<TextInput
// 				value={user.password2}
// 				label='Confirm password'
// 				onTextChange={(value) =>
// 					dispatch({ type: "setPassword2", payload: value })
// 				}
// 				className={classes.textinputStyle}
// 				startIcon={LockOutlinedIcon}
// 				fullWidth
// 			/>
// 		</Paper>
// 	);
// }

// function UserDetails({ user, dispatch }) {
// 	const classes = useStyles();
// 	return (
// 		<Paper>
// 			<Grid
// 				container
// 				direction='row'
// 				justify='space-between'
// 				style={{ width: "80%" }}
// 			>
// 				<TextInput
// 					autoFocus
// 					value={user.name.first}
// 					label='First Name'
// 					onTextChange={(value) =>
// 						dispatch({
// 							type: "setName",
// 							payload: { first: value },
// 						})
// 					}
// 					startIcon={PersonOutlineOutlinedIcon}
// 					className={classes.nameStyle}
// 				/>
// 				<TextInput
// 					value={user.name.last}
// 					label='Last Name'
// 					onTextChange={(value) =>
// 						dispatch({
// 							type: "setName",
// 							payload: { last: value },
// 						})
// 					}
// 					size='small'
// 					// startIcon={PersonOutlineOutlinedIcon}
// 					className={classes.nameStyle}
// 				/>
// 			</Grid>
// 			<TextInput
// 				value={user.phone}
// 				label='Phone number'
// 				type='tel'
// 				onTextChange={(value) =>
// 					dispatch({
// 						type: "setPhone",
// 						payload: value,
// 					})
// 				}
// 				className={classes.textinputStyle}
// 				startIcon={AccountCircleOutlinedIcon}
// 				fullWidth
// 			/>

// 			<MuiPickersUtilsProvider utils={DateFnsUtils}>
// 				<div
// 					style={{
// 						display: "flex",
// 						flexDirection: "row",
// 						alignItems: "center",
// 					}}
// 					className={classes.textinputStyle}
// 				>
// 					<CakeOutlinedIcon style={{ marginTop: 8 }} />
// 					<DatePicker
// 						margin='normal'
// 						id='date-picker-dialog'
// 						label='Date picker dialog'
// 						format='MM/dd/yyyy'
// 						value={user.birthDate}
// 						onChange={(value) =>
// 							dispatch({
// 								type: "setBirthDate",
// 								payload: value,
// 							})
// 						}
// 						inputVariant='outlined'
// 						size='small'
// 						style={{ marginLeft: 10, flex: 1 }}
// 					/>
// 				</div>
// 			</MuiPickersUtilsProvider>
// 			<Grid
// 				container
// 				direction='row'
// 				justify='space-between'
// 				style={{ width: "80%" }}
// 			>
// 				<TextInput
// 					value={user.height}
// 					label='Height'
// 					type='number'
// 					onTextChange={(value) =>
// 						dispatch({
// 							type: "setHeight",
// 							payload: value,
// 						})
// 					}
// 					// startIcon={BmiIcon}
// 					startIcon={MyBmiIcon}
// 					className={classes.nameStyle}
// 				/>
// 				<TextInput
// 					value={user.weight}
// 					label='Weight'
// 					type='number'
// 					onTextChange={(value) =>
// 						dispatch({
// 							type: "setWeight",
// 							payload: value,
// 						})
// 					}
// 					size='small'
// 					className={classes.nameStyle}
// 				/>
// 			</Grid>
// 		</Paper>
// 	);
// }

const useStyles = makeStyles((theme) => ({
	conatinerStyles: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		// alignItems: "center",
		// width: "100%",
		// marginBottom: theme.spacing(2),
	},
	iconButtonStyle: {
		"&:hover": {
			borderRadius: "10px",
			backgroundColor: theme.palette.grey[300],
		},
	},
}));

function SignUpForm({ children, formik }) {
	const [selectedCard, setSelectedCard] = React.useState(0);
	const [totalCards, setTotalCards] = React.useState(children.length);

	React.useEffect(() => {
		setTotalCards(children.length);
	}, [children]);

	const classes = useStyles();

	return (
		<Container
			className={classes.conatinerStyles}
			// elevation={0}
		>
			{children.map((Child, index) => {
				return (
					<Paper
						key={index}
						elevation={0}
						style={{
							minHeight: 380,
							display: selectedCard === index ? "flex" : "none",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						{Child}
					</Paper>
				);
			})}
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='space-between'
				marginTop={2}
			>
				<IconButton
					disabled={selectedCard === 0 ? true : false}
					onClick={() => {
						setSelectedCard((prevState) => prevState - 1);
					}}
					className={classes.iconButtonStyle}
				>
					<ArrowBackIosOutlinedIcon size='small' />
					<Typography variant='button'>Prev</Typography>
				</IconButton>
				{selectedCard === totalCards - 1 ? (
					<input
						variant='outlined'
						color='primary'
						// size='large'
						className={classes.submitbtn}
						type='submit'
						// onClick={(e) => onSignUp()}
						style={{ justifySelf: "flex-end" }}
						value='Sign up'
					/>
				) : (
					<IconButton
						style={{ justifySelf: "flex-end" }}
						onClick={() => {
							Promise.all([
								formik.validateField("email"),
								formik.validateField("password"),
								formik.validateField("password2"),
							])
								.then((values) => {
									setSelectedCard(
										(prevState) => prevState + 1
									);
								})
								.catch((e) =>
									console.log(
										"Error in validating account details: ",
										e
									)
								);
						}}
						className={classes.iconButtonStyle}
					>
						<Typography color='textPrimary' variant='button'>
							Next
						</Typography>
						<ArrowBackIosOutlinedIcon
							size='small'
							style={{ transform: "scaleX(-1)" }}
						/>
					</IconButton>
				)}
			</Box>
		</Container>
	);
}

export default SignUpForm;
