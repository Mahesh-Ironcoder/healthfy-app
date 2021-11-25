import DateFnsUtils from "@date-io/date-fns";

import { useFormik } from "formik";

import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	Link,
	makeStyles,
	Paper,
	SvgIcon,
	TextField,
	Typography,
} from "@material-ui/core";

//---------------------Icon import----------------------------------------------
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CakeOutlinedIcon from "@material-ui/icons/CakeOutlined";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
//---------------------End Icon import----------------------------------------------

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import React from "react";

import * as yup from "yup";

import { ReactComponent as BmiIcon } from "../body-mass-index.svg";
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
	LoginCardContainer: {
		marginTop: theme.spacing(2),
		[theme.breakpoints.down("sm")]: { width: "100%", minWidth: "300px" },
		display: "flex",
		flexDirection: "column",
		// alignItems: "center",
		// paddingLeft: theme.spacing(8),
		// paddingRight: theme.spacing(8),
	},
	cardHeaderStyle: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	form: {
		// marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
	},
	submitbtn: {
		// margin: "1rem 0rem",
		width: "40%",
		color: theme.palette.primary.contrastText,
	},
	avatar: {
		// marginTop: theme.spacing(1),
		background: theme.palette.info.main,
	},
	linkStyle: {
		color: theme.palette.grey[500],
	},
	textinputStyle: {
		width: "80%",
		// alignSelf: "flex-start",
	},
	nameStyle: {
		width: "50%",
		flex: 1,
	},
	input: {
		display: "none",
	},
	errorText: { width: "80%", paddingLeft: "2.5em" },
}));

function TextInput(props) {
	const {
		value,
		onTextChange,
		className,
		startIcon: MyIcon,
		...rest
	} = props;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}
			className={className}
		>
			{MyIcon && <MyIcon style={{ marginTop: 8 }} />}
			<TextField
				margin='normal'
				value={value}
				// onChange={(e) => {
				// 	onTextChange(e.target.value);
				// }}
				onChange={onTextChange}
				variant='outlined'
				size='small'
				required
				color='secondary'
				style={{ marginLeft: 10 }}
				{...rest}
			/>
		</div>
	);
}

function MyBmiIcon() {
	return (
		<SvgIcon
			component={BmiIcon}
			style={{ stroke: "black", strokeWidth: 20 }}
			viewBox='0 0 600 476.6'
		/>
	);
}

// function AccountDetails({ user, dispatch }) {
// 	const classes = useStyles();
// 	return (
// 		<Paper
// 			style={{
// 				display: "flex",
// 				flexDirection: "column",
// 				justifyContent: "center",
// 				alignItems: "center",
// 			}}
// 			elevation={0}
// 		>
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
function AccountDetails({ formik }) {
	const classes = useStyles();
	return (
		<Paper
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
			elevation={0}
		>
			<TextInput
				value={formik.values.email}
				label='Email'
				type='email'
				onTextChange={formik.handleChange}
				className={classes.textinputStyle}
				startIcon={AccountCircleOutlinedIcon}
				fullWidth
				autoComplete='email'
				inputProps={{ id: "emailId", name: "email" }}
			/>
			{formik.touched["email"] && formik.errors.email ? (
				<Typography
					color='error'
					variant='body2'
					className={classes.errorText}
				>
					{formik.errors.firstName}
				</Typography>
			) : null}
			<TextInput
				value={formik.values.password}
				label='Password'
				type='password'
				onTextChange={formik.handleChange}
				className={classes.textinputStyle}
				startIcon={LockOutlinedIcon}
				fullWidth
				inputProps={{ id: "passId", name: "password" }}
			/>
			{formik.touched["password"] && formik.errors.password ? (
				<Typography
					color='error'
					variant='body2'
					className={classes.errorText}
				>
					{formik.errors.firstName}
				</Typography>
			) : null}
			<TextInput
				value={formik.values.password2}
				label='Confirm password'
				onTextChange={formik.handleChange}
				className={classes.textinputStyle}
				startIcon={LockOutlinedIcon}
				fullWidth
				inputProps={{ id: "passId2", name: "password2" }}
			/>
			{formik.touched["password2"] && formik.errors.password2 ? (
				<Typography
					color='error'
					variant='body2'
					className={classes.errorText}
				>
					{formik.errors.firstName}
				</Typography>
			) : null}
		</Paper>
	);
}

// function UserDetails({ user, dispatch }) {
// 	const classes = useStyles();
// 	// let ipvar = document.createElement('input')
// 	// ipvar.type='file'
// 	// ipvar.files
// 	return (
// 		<Paper
// 			style={{
// 				display: "flex",
// 				flexDirection: "column",
// 				justifyContent: "center",
// 				alignItems: "center",
// 			}}
// 			elevation={0}
// 		>
// 			<input
// 				accept='image/*'
// 				className={classes.input}
// 				id='contained-button-file'
// 				multiple
// 				type='file'
// 			/>
// 			<label htmlFor='contained-button-file'>
// 				<IconButton>
// 					<Avatar
// 						src='/images/example.jpg'
// 						style={{
// 							// margin: "10px",
// 							width: "100px",
// 							height: "100px",
// 						}}
// 					/>
// 				</IconButton>
// 			</label>
// 			{/* <Avatar alt='New User' style={{ width: 80, height: 80 }}></Avatar> */}
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
function UserDetails({ formik }) {
	const classes = useStyles();
	// let ipvar = document.createElement('input')
	// ipvar.type='file'
	// ipvar.files
	return (
		<Paper
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
			elevation={0}
		>
			<input
				accept='image/*'
				className={classes.input}
				id='contained-button-file'
				multiple
				type='file'
			/>
			<label htmlFor='contained-button-file'>
				<IconButton>
					<Avatar
						src='/images/example.jpg'
						style={{
							// margin: "10px",
							width: "100px",
							height: "100px",
						}}
					/>
				</IconButton>
			</label>
			{/* <Avatar alt='New User' style={{ width: 80, height: 80 }}></Avatar> */}
			<Grid
				container
				direction='row'
				justify='space-between'
				style={{ width: "80%" }}
			>
				<TextInput
					autoFocus
					value={formik.values.firstName}
					label='First Name'
					name='firstName'
					onTextChange={formik.handleChange}
					startIcon={PersonOutlineOutlinedIcon}
					className={classes.nameStyle}
				/>
				{formik.touched.firstName && formik.errors.firstName ? (
					<Typography
						color='error'
						variant='body2'
						className={classes.errorText}
					>
						{formik.errors.firstName}
					</Typography>
				) : null}
				<TextInput
					value={formik.values.lastName}
					label='Last Name'
					name='lastName'
					onTextChange={formik.handleChange}
					size='small'
					// startIcon={PersonOutlineOutlinedIcon}
					className={classes.nameStyle}
				/>
				{formik.touched.lastName && formik.errors.lastName ? (
					<Typography
						color='error'
						variant='body2'
						className={classes.errorText}
					>
						{formik.errors.lastName}
					</Typography>
				) : null}
			</Grid>
			<TextInput
				value={formik.values.phone}
				label='Phone number'
				type='tel'
				name='phone'
				onTextChange={formik.handleChange}
				className={classes.textinputStyle}
				startIcon={AccountCircleOutlinedIcon}
				fullWidth
			/>
			{formik.touched.phone && formik.errors.phone ? (
				<Typography
					color='error'
					variant='body2'
					className={classes.errorText}
				>
					{formik.errors.phone}
				</Typography>
			) : null}

			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
					className={classes.textinputStyle}
				>
					<CakeOutlinedIcon style={{ marginTop: 8 }} />
					<DatePicker
						margin='normal'
						id='date-picker-dialog'
						label='Date picker dialog'
						format='MM/dd/yyyy'
						value={formik.values.birthDate}
						name='birth_date'
						onChange={formik.handleChange}
						inputVariant='outlined'
						size='small'
						style={{ marginLeft: 10, flex: 1 }}
					/>
					{formik.touched.birth_date && formik.errors.birth_date ? (
						<Typography
							color='error'
							variant='body2'
							className={classes.errorText}
						>
							{formik.errors.birth_date}
						</Typography>
					) : null}
				</div>
			</MuiPickersUtilsProvider>
			<Grid
				container
				direction='row'
				justify='space-between'
				style={{ width: "80%" }}
			>
				<TextInput
					value={formik.values.height}
					label='Height'
					type='number'
					name='height'
					onTextChange={formik.handleChange}
					// startIcon={BmiIcon}
					startIcon={MyBmiIcon}
					className={classes.nameStyle}
				/>
				{formik.touched.height && formik.errors.height ? (
					<Typography
						color='error'
						variant='body2'
						className={classes.errorText}
					>
						{formik.errors.height}
					</Typography>
				) : null}
				<TextInput
					value={formik.values.weight}
					label='Weight'
					type='number'
					name='weight'
					onTextChange={formik.handleChange}
					size='small'
					className={classes.nameStyle}
				/>
				{formik.touched.weight && formik.errors.weight ? (
					<Typography
						color='error'
						variant='body2'
						className={classes.errorText}
					>
						{formik.errors.weight}
					</Typography>
				) : null}
			</Grid>
		</Paper>
	);
}

const initialState = {
	email: "",
	password: "",
	password2: "",
	firstName: "",
	lastName: "",
	phone: "",
	birthDate: new Date("2021-05-02"),
	height: "",
	weight: "",
	photo: "",
};

const yupValidationScheme = yup.object({
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email Required"),
	password: yup.string().min(8, "Atleast 8 characters").required("Required"),
	password2: yup.string().min(8, "Atleast 8 characters").required("Required"),
	firstName: yup.string().required("Required"),
	lastName: yup.string().required("Required"),
	phone: yup
		.string()
		.matches(/^[6-9]\d{9}$/, {
			message: "Please enter valid number.",
			excludeEmptyString: false,
		})
		.required("Required"),
	birthDate: yup
		.date()
		.default(() => new Date())
		.required("Required"),
	height: yup
		.number()
		.integer("Your height must be integer")
		.positive("can't be a negative number")
		.required("Required"),
	weight: yup
		.number()
		.integer("Your weight must be integer")
		.positive("can't be a negative number")
		.required("Required"),
	photo: yup.string().required("Required"),
});



export default function Signup() {


	const handleRegister = (values) => {
		// if (values.password !== values.password2) {
		// 	window.alert("Please match both the password fields");
		// }
		// console.log("BirthDate: ", values.birthDate.toUTCString());
		alert(JSON.stringify(values, null, 2));
		// let userDetails = { email, password, dn: `${name.first} ${name.last}` };
	};

	const formik = useFormik({
		initialValues: initialState,
		validationSchema: yupValidationScheme,
		onSubmit: handleRegister,
	});

	// formik.val
	// const { login } = ReactuseContext(AppContext);
	const classes = useStyles();
	return (
		<Grid container direction='row' justify='center' alignItems='center'>
			<Grid item xs={1} sm={2} />
			<Grid item xs={10} sm={5}>
				<Card
					variant='elevation'
					raised
					className={classes.LoginCardContainer}
				>
					<CardHeader
						title='Sign Up'
						titleTypographyProps={{ variant: "h4" }}
						avatar={<LocalHospitalIcon fontSize='large' />}
						className={classes.cardHeaderStyle}
					/>
					<CardContent>
						<form
							className={classes.form}
							noValidate
							onSubmit={formik.handleSubmit}
						>
							<SignUpForm totalCards={2} formik={formik}>
								{/* <div>Hi</div> */}
								<AccountDetails formik={formik} />
								<UserDetails formik={formik} />
							</SignUpForm>
						</form>
						<Link className={classes.linkStyle} href='/'>
							Already have an account?
						</Link>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={1} sm={2} />
		</Grid>
	);
}
