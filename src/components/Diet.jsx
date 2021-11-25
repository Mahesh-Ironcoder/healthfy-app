import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

function createData(name, item1 = "", item2 = "", item3 = "") {
	return { name, item1, item2, item3 };
}

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		// border: "1px solid black",
		// // margin: "5px",
	},
});

function Diet() {
	const classes = useStyles();
	const rows = [
		createData("Break Fast", "Tea/Coffee/Buttermilk", "Oats/Upma"),
		createData("Mid Morning", "Apple", "Orange", "Papaya"),
		createData(
			"Lunch",
			"1 Bowl Vegetable Oats along with rice",
			"1 Bowl dal along with rice",
			"1 Bowl salad along with rice"
		),
		createData("Evening Snacks", "Apple", "Guava", "Pear"),
		createData(
			"Dinner",
			"Saag Mustard along with rice",
			"Vegetable Oats along with Soup",
			"Vegetable Salad along with rice"
		),
	];
	return (
		<TableContainer
			component={Paper}
			style={{
				margin: "auto",
				// marginTop: "5%",
				// width: "80%",
				height: "90vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Typography
				variant='h5'
				color='textPrimary'
				style={{ margin: "10px" }}
			>
				Atleast one Item from the given table can be consumed
			</Typography>
			<Table className={classes.table} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Time Period</TableCell>
						<TableCell align='right'>Item - 1</TableCell>
						<TableCell align='right'>Item - 2</TableCell>
						<TableCell align='right'>Item - 3</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell align='right'>{row.item1}</TableCell>
							<TableCell align='right'>{row.item2}</TableCell>
							<TableCell align='right'>{row.item3}</TableCell>
							{/* <TableCell align='right'>{row.protein}</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Diet;
