import React from "react";
import {
	makeStyles,
	Card,
	CardHeader,
	CardContent,
	LinearProgress,
	withStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		// minWidth: 195,
		// minHeight: 150,
		margin: 16,
	},
}));

export const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 8,
		borderRadius: 4,
		width: "100%",
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 300 : 700],
	},
	bar: {
		borderRadius: 4,
		backgroundColor: "#1a90ff",
	},
}))(LinearProgress);

export default function VitalDisplayCard(props) {
	const [data, setData] = React.useState(props.data);
	const classes = useStyles();
	React.useEffect(() => {
		setData(props.data);
	}, [props]);
	if (data === null) {
		return (
			<Card elevation={5} style={{ margin: 16 }}>
				<CardHeader title={props.title} />
				<CardContent>
					<BorderLinearProgress />
				</CardContent>
			</Card>
		);
	}
	return (
		<Card elevation={5} className={classes.root}>
			<CardHeader title={props.title} />
			<CardContent>
				{data} {!props.noUnits && "mg/dL"}
			</CardContent>
		</Card>
	);
}
