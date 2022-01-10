import { Grid, makeStyles } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import React from 'react';

import { useHistory } from 'react-router';

import { AuthContext } from '../contexts/AuthContext';
import VitalDisplayCard from './VitalDisplayCard';

import RTDataChart from './RTDataChart';
import CircularStatic from './CircularProgressWithLabel';
import useBluetoothDevice from '../hooks/bluetooth';

const useStyles = makeStyles((theme) => ({
	appbarStyles: {
		paddingRight: theme.spacing(1),
		display: 'flex',
		flexDirection: 'row',
	},
	appHeaderStyle: {
		flexGrow: 1,
	},
	gridContainer: {
		padding: theme.spacing(5),
	},
	apd: {
		margin: 16,
		width: '100%',
	},
}));

const idata = {
	bp: null,
	glucose: null,
	SpO2: null,
	Cholestrol: null,
};

export default function Home(props) {
	const [vitals, setVitals] = React.useState(idata);

	const { currUser } = React.useContext(AuthContext);
	const { server } = useBluetoothDevice;
	const db = firebase.firestore();

	const glucoseDataRef = React.useRef(null);
	const bpDataRef = React.useRef(null);

	let history = useHistory();

	const fetchGlucose = React.useCallback(
		(dia = 80, sis = 120) => {
			let formData = new FormData();
			formData.append('diastole', dia);
			formData.append('sistole', sis);
			formData.append('uid', currUser.uid);

			let requestOptions = {
				method: 'POST',
				redirect: 'follow',
				body: formData,
			};

			fetch('/api/predict_glucose', requestOptions)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					// setVitals({
					// 	...vitals,
					// 	glucose: parseInt(result.glucosePrediction),
					// 	// bp: "Sistole: 80 \n Diastole: 110",
					// });
				})
				.catch((error) => console.log('error in fetching glucose value', error));
		},
		[currUser.uid]
	);

	const getSpo2Data = () => {
		return parseInt(Math.random() * (100 - 85) + 85);
	};
	const getHeartRate = () => {
		return parseInt(Math.random() * (100 - 50) + 50);
	};
	const getCholestrol = () => {
		return parseInt(Math.random() * (100 - 50) + 50);
	};

	function handleCharacteristicValueChanged(e) {
		// console.log(e.target.value.getUint8(0) + "%");
		// console.log(e.target.value);
		let readValue = e.target.value.getUint16();
		let bp = {
			sis: readValue & 0xff,
			dia: (readValue >> 8) & 0xff,
		};
		// setBpValues(bp);
		setVitals((prevState) => ({
			...prevState,
			bp: `Diastole: ${bp.dia} Sistole: ${bp.sis}`,
		}));
	}

	async function getValuesFromGatt(gattserver) {
		try {
			if (gattserver) {
				let service = await gattserver.getPrimaryService('blood_pressure');
				let bpm = await service.getCharacteristic('blood_pressure_measurement');
				return bpm;
			}
		} catch (e) {
			console.error('Error in connecting to bluetooth device from home: ', e);
			return null;
		}
	}

	function handleNextGLData(doc) {
		console.log('Listen from glucose: ');
		let dataTable = [['Time', 'Glucose']];
		if (doc.exists) {
			let data = doc.data();
			console.log('data', data);
			let dataToX = Object.keys(data);
			let dataToY = Object.values(data);
			let dataLength = dataToX.length;
			let onlyData = [];
			for (let i = 0; i < dataLength && i < 10; i++) {
				onlyData.push([dataToX[i], parseInt(dataToY[i])]);
			}
			if (onlyData.length === 0) dataTable.push([['19:10:05', 70]]);
			else {
				onlyData.sort((a, b) => {
					return new Date(b[0]) - new Date(a[0]);
				});
				onlyData = onlyData.reverse();
				console.log('Only data: ', onlyData);
				setVitals({ ...vitals, glucose: parseInt(onlyData[0][1]) });
				dataTable = [['Time', 'Glucose'], ...onlyData];
			}
		} else {
			console.log('NO such doc');
		}
		glucoseDataRef.current = dataTable;
	}

	function handleSnapshotError(err) {
		console.log('Error in snapshot: ', err);
	}

	function handleNextBPData(doc) {
		let dataTable = [['Time', 'Diastole', 'Systole']];
		if (doc.exists) {
			let data = doc.data();
			console.log('data', data);
			let dataToX = Object.keys(data);
			let dataToY = Object.values(data);
			let y1 = [],
				y2 = [];
			dataToY.forEach((y) => {
				y1.push(y['diastole']);
				y2.push(y['systole']);
			});
			let dataLength = dataToX.length;
			let onlyData = [];
			for (let i = 0; i < dataLength && i < 10; i++) {
				onlyData.push([dataToX[i], parseInt(y1[i]), parseInt(y2[i])]);
			}
			if (onlyData.length === 0) {
				dataTable.push([['19:10:05', 80, 120]]);
				dataTable.push([['19:10:05', 80, 120]]);
			}
			onlyData.sort((a, b) => {
				return new Date(b[0]) - new Date(a[0]);
			});
			// setVitals({
			// 	...vitals,
			// 	bp: `Diastole: ${parseInt(onlyData[9][1])} Sistole: ${parseInt(
			// 		onlyData[9][2]
			// 	)}`,
			// });
			onlyData = onlyData.reverse();
			console.log('Only data: ', onlyData);
			dataTable = [['Time', 'Diastole', 'Systole'], ...onlyData];
		} else {
			console.log('NO such doc');
		}
		bpDataRef.current = dataTable;
	}

	React.useEffect(() => {
		let bpm = null;
		if (server) {
			(async () => {
				bpm = await getValuesFromGatt(server);
				bpm.addEventListener(
					'characteristicvaluechanged',
					handleCharacteristicValueChanged
				);
				bpm.startNotifications();

				let reading = await bpm.readValue();
				let readValue = reading.getUint16();
				console.log('Reading bp: ', readValue);
				let bp = {
					sis: readValue & 0xff,
					dia: (readValue >> 8) & 0xff,
				};
				setVitals((prevState) => {
					console.log('PRev state: ', prevState);
					return {
						...prevState,
						bp: `Diastole: ${bp.dia} Sistole: ${bp.sis}`,
					};
				});
			})();
		} else {
			alert('No bluetooth Devices found...Please connect to one');
			history.push('/devices');
		}
		// toDataTable();
		return () => {
			if (bpm) {
				bpm.removeEventListener('characteristicvaluechanged', () => {
					console.log('Removed event listener from home');
				});
			}
		};
	}, [server]);

	React.useEffect(() => {
		if (vitals.bp) {
			let [a, dia, b, sis] = vitals.bp.split(' ');
			console.log(a, ': ', dia, ' ', b, ': ', sis);
			fetchGlucose(dia, sis);
		}
	}, [vitals.bp, fetchGlucose]);

	React.useEffect(() => {
		let today = today_date();
		console.log('---------------today: ', today, currUser.uid);
		const gt_ref = db
			.collection('userProfiles')
			.doc(currUser.uid)
			.collection('glucose_trends')
			.doc(today);
		let unsubscribeGt = gt_ref.onSnapshot(handleNextGLData, handleSnapshotError);
		const bp_ref = db
			.collection('userProfiles')
			.doc(currUser.uid)
			.collection('bp_trends')
			.doc(today);
		let unsubscribeBP = bp_ref.onSnapshot(handleNextBPData, handleSnapshotError);
		return () => {
			console.log('Unsubscribing snapshot listener: ');
			unsubscribeGt();
			unsubscribeBP();
		};
	}, [currUser.uid, db]);

	const classes = useStyles();
	return (
		<Grid
			container
			direction='column'
			alignItems='flex-start'
			className={classes.gridContainer}
			spacing={1}>
			<Grid
				item
				container
				direction='row'
				justify='space-between'
				alignItems='center'
				spacing={2}>
				<Grid item xs={12} sm={4} zeroMinWidth>
					{/* <RTDataChart db={db} currUser={currUser} pV={vitals.bp} /> */}
					<RTDataChart data={glucoseDataRef.current} title='Glucose trends' />
				</Grid>
				<Grid item xs={12} sm={4} zeroMinWidth>
					{/* <RTDataChart db={db} currUser={currUser} pV={vitals.bp} /> */}
					<RTDataChart data={bpDataRef.current} title='Blood Pressure trends' />
				</Grid>

				<Grid item container xs={12} sm={4} direction='column' justify='center'>
					<Grid item>
						<VitalDisplayCard data={vitals.glucose} title={'Glucose'} />
					</Grid>
					<Grid item>
						<VitalDisplayCard data={vitals.bp} title={'Blood Pressure'} noUnits />
					</Grid>
				</Grid>
			</Grid>
			<Grid item container direction='row' spacing={2} xs={12} sm>
				{/* <div className={classes.apd}>
					SpO2
					<BorderLinearProgress variant='determinate' value={50} />
				</div> */}
				<Grid item xs={12} sm>
					<CircularStatic progressValue={getSpo2Data()} title='SpO2' />
				</Grid>
				<Grid item xs={12} sm>
					<CircularStatic
						progressValue={getHeartRate()}
						title='Heart Rate'
						unit='bpm'
					/>
				</Grid>
				<Grid item xs={12} sm>
					<CircularStatic
						progressValue={getCholestrol()}
						title='Cholestrol'
						unit='mg/dL'
					/>
				</Grid>
				{/* <div className={classes.apd}>
					Cholestrol
					<BorderLinearProgress variant='determinate' value={50} />
				</div>
				<div className={classes.apd}>
					Heamoglobin
					<BorderLinearProgress variant='determinate' value={50} />
				</div> */}
			</Grid>
		</Grid>
	);
}
function today_date() {
	let date = new Date();
	let today = date.toLocaleDateString().split('/').reverse();
	let todayDate = `${today[0]}-0${today[2]}-${today[1]}`;
	return todayDate;
}
