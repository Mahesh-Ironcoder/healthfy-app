import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import React from 'react';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Battery20Icon from '@material-ui/icons/Battery20';
import Battery30Icon from '@material-ui/icons/Battery30';
import Battery50Icon from '@material-ui/icons/Battery50';
import Battery60Icon from '@material-ui/icons/Battery60';
import Battery80Icon from '@material-ui/icons/Battery80';
import Battery90Icon from '@material-ui/icons/Battery90';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import { BluetoothDeviceContext } from '../contexts/BluetoothDeviceContext';
import useBluetoothDevice from '../hooks/bluetooth';

function ScanDevices({ onDeviceDetection }) {
	return (
		<>
			<Typography variant='h5'>Scan for nearby devices</Typography>
			<Button
				onClick={onDeviceDetection}
				size='large'
				variant='outlined'
				color='primary'>
				Scan
			</Button>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	gridContiner: { width: '100%', height: '90vh' },
	disStyles: {
		'borderRadius': '50px',
		'&:hover': {
			borderRadius: '10px',
			backgroundColor: theme.palette.grey[300],
		},
	},
	scanContainer: {
		width: '100%',
		height: '100%',
		minHeight: '380px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexWrap: 'wrap',
		alignContent: 'space-around',
	},
}));

const DisplayBattery = ({ level }) => {
	if (level <= 20) {
		return <Battery20Icon style={{ marginTop: -4 }} />;
	} else if (level <= 30) {
		return <Battery30Icon style={{ marginTop: -4 }} />;
	} else if (level <= 50) {
		return <Battery50Icon style={{ marginTop: -4 }} />;
	} else if (level <= 60) {
		return <Battery60Icon style={{ marginTop: -4 }} />;
	} else if (level <= 90) {
		return (
			<Battery80Icon
				size='medium'
				// style={{ transform: "rotate(90deg)" }}
				style={{ marginTop: -4 }}
			/>
		);
	} else if (level < 100) {
		return <Battery90Icon style={{ marginTop: -4 }} />;
	} else {
		return <BatteryFullIcon style={{ marginTop: -4 }} />;
	}
};

function Devices() {
	const { device, scanDevices, server, disconnect } = useBluetoothDevice();

	const [deviceChar, setDeviceChar] = React.useState('');
	const [charValue, setCharValue] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	const classes = useStyles();

	const handleDisconnect = () => {
		disconnect();
		setDeviceChar('');
		setCharValue('');
	};

	React.useEffect(() => {
		// console.log("effect due to device");
		(async () => {
			if (device && server) {
				setLoading(true);
				try {
					// console.log("Device: ", device);
					// console.log("Server: ", server);

					const service = await server.getPrimaryService('blood_pressure');
					const char = await service.getCharacteristic('blood_pressure_measurement');
					// console.log(char);
					setDeviceChar(char);
					// if (char) {
					// 	try {
					// 		let reading = await char.readValue();
					// 		let readValue = reading.getUint16();
					// 		// console.log("from hook - 0 ", readValue + "%");
					// 		// console.log("from hook -2", readValue & 0xff, " %");
					// 		// console.log("from hook -3", (readValue >> 8) & 0xff, " %");
					// 		setCharValue(readValue.getUint8(0));
					// 	} catch (e) {
					// 		console.error(
					// 			"Error in getting charactersitics from bluetooth device: ",
					// 			e
					// 		);
					// 	}
					// }
					// setLoading(false);
				} catch (e) {
					console.error('Error in connecting to bluetooth device: ', e);
					setLoading(false);
				}
			}
		})();
	}, [device, server]);

	React.useEffect(() => {
		(async () => {
			if (deviceChar) {
				try {
					let reading = await deviceChar.readValue();
					let readValue = reading.getUint16();
					// console.log("from hook - 0 ", readValue + "%");
					// console.log("from hook -2", readValue & 0xff, " %");
					// console.log("from hook -3", (readValue >> 8) & 0xff, " %");
					setCharValue((readValue >> 8) & 0xff);
					setLoading(false);
				} catch (e) {
					console.error(
						'Error in getting charactersitics from bluetooth device: ',
						e
					);
					setLoading(false);
				}
			}
			setLoading(false);
		})();
	}, [deviceChar]);

	if (loading) {
		return (
			<Container
				style={{
					height: '90vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<CircularProgress color='secondary' size={100} />
			</Container>
		);
	}

	return (
		<Grid
			container
			direction='row'
			justify='center'
			alignItems='center'
			className={classes.gridContiner}>
			<Grid item xs={12} sm={6} flex={1}>
				<Paper elevation={2} className={classes.scanContainer}>
					{device ? (
						<Box
							width='100%'
							height='100%'
							display='flex'
							flexDirection='column'
							justifyContent='space-around'
							alignItems='center'>
							<Typography variant='h5' color='primary'>
								Device connected to
							</Typography>
							<Typography variant='h5' color='primary'>
								{device.name}
							</Typography>
							<Typography
								varaint='body2'
								style={{
									display: 'flex',
									flexDirection: 'row',
									// alignItems: "center",
								}}>
								Device Battery Level: <DisplayBattery level={charValue} />
								{charValue}
							</Typography>
							<IconButton className={classes.disStyles} onClick={handleDisconnect}>
								<ExitToAppIcon />
								Disconnect
							</IconButton>
						</Box>
					) : (
						<ScanDevices onDeviceDetection={(d) => scanDevices(d)} />
					)}
				</Paper>
			</Grid>
		</Grid>
	);
}

export default Devices;
