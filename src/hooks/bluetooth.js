import { useState, useEffect } from 'react';

export default function useBluetoothDevice() {
	const [device, setDevice] = useState(null);
	const [server, setServer] = useState('');
	const onDisconnect = (event) => {
		const device = event.target;
		console.log(`Device ${device.name} is disconnected.`);
		setDevice(null);
	};
	const scanDevices = async (e) => {
		const bleDevice = await navigator.bluetooth.requestDevice({
			filters: [{ services: ['blood_pressure'] }],
			// optionalServices: [{ services: ["blood_pressure"] }],
			// acceptAllDevices: true,
		});
		bleDevice.addEventListener('gattserverdisconnected', onDisconnect);
		const bleserver = await bleDevice.gatt.connect();
		setDevice(bleDevice);
		setServer(bleserver);
	};
	const disconnect = async () => {
		if (device) {
			try {
				console.log('Disconnected');
				await device.gatt.disconnect();
				setDevice(null);
				setServer('');
			} catch (e) {
				console.error('Error in connecting to bluetooth device: ', e);
			}
		}
	};
	useEffect(() => {
		return () => {
			if (device) {
				device.removeEventListener('characteristicvaluechanged', () => {
					console.log('Device ondisconnect listener removed');
				});
			}
		};
	});
	return { device, scanDevices, server, disconnect };
}
