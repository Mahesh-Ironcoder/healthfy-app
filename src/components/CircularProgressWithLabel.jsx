import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(props) {
	return (
		<Box
			position='relative'
			display='inline-flex'
			flexDirection='column'
			alignItems='center'
			width='200px'
			height='200px'
		>
			<Typography variant='h5' component='div' color='textPrimary'>
				{props.title}
			</Typography>
			<CircularProgress variant='determinate' {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position='absolute'
				justifySelf='flex-start'
				display='flex'
				alignItems='center'
				justifyContent='center'
			>
				{props.unit ? (
					<Typography
						variant='h5'
						component='div'
						color='textPrimary'
					>{`${Math.round(props.value)} ${
						props.unit ? props.unit : "%"
					}`}</Typography>
				) : (
					<Typography
						variant='h4'
						component='div'
						color='textPrimary'
					>{`${Math.round(props.value)} %`}</Typography>
				)}
				{/* <Typography
					variant='h4'
					component='div'
					color='textPrimary'
				>{`${Math.round(props.value)} ${
					props.unit ? props.unit : "%"
				}`}</Typography> */}
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate variant.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

export default function CircularStatic(props) {
	const [progress, setProgress] = React.useState(props.progressValue);
	const [inc, setInc] = React.useState(0);

	React.useEffect(() => {
		// for (let i = 0; i <= props.value; i++) {
		// 	if (i <= 100) {
		// 		setProgress(i);
		// 	} else {
		// 		setProgress(0);
		// 		break;
		// 	}
		// }
		let i = 0;
		let interval = setInterval(() => {
			if (i > progress) clearInterval(interval);
			else {
				setInc(i);
				i += 1;
			}
		}, 15);
		return () => {
			clearInterval(interval);
		};
	}, []);

	React.useEffect(() => {
		setProgress(props.progressValue);
	}, [props.progressValue]);

	return (
		<CircularProgressWithLabel
			value={inc}
			title={props.title}
			size={150}
			unit={props.unit}
		/>
	);
}
