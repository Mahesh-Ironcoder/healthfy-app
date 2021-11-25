import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";



export default function RTDataChart(props) {
	// const { currUser, db, pV } = props;
	const [data, setData] = useState(props.data);
	// const [dataLoading, setDataLoading] = useState(true);

	useEffect(() => {
		setData(props.data);
		// if (data && data.length > 1) setDataLoading(false);
	}, [props.data, data]);

	// useEffect(() => {
	// 	const toDataTable = async (data = null) => {
	// 		let date = new Date();
	// 		let today = date.toISOString().split("T")[0];
	// 		const gt_ref = await db
	// 			.collection("userProfiles")
	// 			.doc(currUser.uid)
	// 			.collection("glucose_trends")
	// 			.doc(today);
	// 		let dataTable = [["Time", "Glucose"]];
	// 		// let dataTable = [];

	// 		try {
	// 			let doc = await gt_ref.get();
	// 			if (doc.exists) {
	// 				let data = doc.data();
	// 				// data.sort((a, b) => {
	// 				// 	let akey = Object.keys(a)[0];
	// 				// 	let bkey = Object.keys(b)[0];
	// 				// 	return new Date(bkey) - new Date(akey);
	// 				// });
	// 				console.log("data", data);
	// 				let dataToX = Object.keys(data);
	// 				let dataToY = Object.values(data);
	// 				let dataLength = dataToX.length;
	// 				let onlyData = [];
	// 				for (let i = 0; i < dataLength; i++) {
	// 					onlyData.push([dataToX[i], parseInt(dataToY[i])]);
	// 				}
	// 				onlyData.sort((a, b) => {
	// 					return new Date(b[0]) - new Date(a[0]);
	// 				});
	// 				dataTable = [["Time", "Glucose"], ...onlyData];
	// 			} else {
	// 				console.log("NO such doc");
	// 			}
	// 			console.log("Data table: ", dataTable);
	// 			setData(dataTable);
	// 			setDataLoading(false);
	// 		} catch (error) {
	// 			console.log("Error getting document:", error);
	// 			setData(dataTable);
	// 			setDataLoading(false);
	// 		}
	// 	};
	// 	toDataTable();
	// }, [pV, currUser.uid, db]);

	// return dataLoading ? (
	// 	<div className={{ width: "100%", height: "100%" }}> fetching Data</div>
	// ) :
	return (
		<Chart
			width={"500px"}
			height={"300px"}
			// style={{ minHeight: "300px", margin: "10px" }}
			// width='100%'
			// height='100%'
			chartType='AreaChart'
			loader={<div>Loading Chart</div>}
			data={data}
			options={{
				title: props.title,
				hAxis: {
					title: "Time",
					titleTextStyle: { color: "#333" },
				},
				vAxis: { minValue: 0 },
				legend: { position: "top" },
				// For the legend to fit, we make the chart area smaller
				chartArea: { width: "70%", height: "70%" },
				// lineWidth: 25,
			}}
			// For tests
			rootProps={{ "data-testid": "1" }}
		/>
	);
}
