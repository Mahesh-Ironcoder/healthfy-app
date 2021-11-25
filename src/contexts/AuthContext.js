import React, { createContext } from 'react';

import firebase from 'firebase/app';

import 'firebase/auth';

import { useHistory } from 'react-router';
import { AppContext } from '../App';
import { BluetoothDeviceContext } from './BluetoothDeviceContext';
import useBluetoothDevice from '../hooks/bluetooth';

export const AuthContext = createContext();

function AuthContextProvider(props) {
	// const { disconnect } = React.useContext(BluetoothDeviceContext);
	const { handleLoading } = React.useContext(AppContext);

	const [isLogin, setIsLogin] = React.useState(false);
	const [currUser, setCurrUser] = React.useState({});
	const [routeState, setRouteState] = React.useState(null);

	let history = useHistory();
	const { disconnect } = useBluetoothDevice();

	React.useEffect(() => {
		// For Firebase JS SDK v7.20.0 and later, measurementId is optional
		const firebaseConfig = {
			apiKey: 'AIzaSyAbI28Bze1i9YEe809JKZTD0WusYnW4O4M',
			authDomain: 'healthfy-97c5c.firebaseapp.com',
			projectId: 'healthfy-97c5c',
			storageBucket: 'healthfy-97c5c.appspot.com',
			messagingSenderId: '788646882926',
			appId: '1:788646882926:web:209bf314eeb54194acc07f',
			measurementId: 'G-C3B2F7MTDP',
		};
		firebase.initializeApp(firebaseConfig);
	}, []);

	React.useEffect(() => {
		firebase.auth().onAuthStateChanged(handleStateChange);
	}, []);

	React.useEffect(() => {
		if (isLogin) {
			console.log('State of route from context: ', routeState);
			if (routeState && routeState.from) {
				history.push(routeState.from.pathname);
			} else {
				history.push('/');
			}
		} else {
			disconnect();
		}
	}, [isLogin, history, disconnect, routeState]);

	const handleStateChange = (user) => {
		handleLoading(true);

		console.log('state change: ', user);
		if (user) {
			user
				.getIdToken()
				.then((token) => {
					return verifyToken(token);
				})
				.then(
					(resp) => {
						handleLoading(false);
						return resp.json();
					},
					(e) => {
						handleLoading(false);
						console.log('Server Session failed - login fetch error: ', e);
					}
				)
				.then((body) => {
					if (body.status === 'success') {
						console.log('Token verify - 66:', body);
						setIsLogin(true);
						setCurrUser(user);
					}
				})
				.catch((e) => console.log('Get Token id error: ', e));
		}
	};

	const login = (creds, state) => {
		// console.log("Logged in: ", Date.now());
		// console.log("history", history);
		setRouteState(state);
		firebase
			.auth()
			.signInWithEmailAndPassword(creds.user, creds.pass)
			.then((userCredential) => {
				// console.log("User credentials: ", userCredential);
				setCurrUser(userCredential.user);
				setIsLogin(true);
				userCredential.user
					.getIdToken()
					.then((token) => {
						handleLoading(true);
						return verifyToken(token);
					})
					.then(
						(resp) => {
							handleLoading(false);
							return resp.json();
						},
						(e) => {
							handleLoading(false);
							console.log('Server Session failed - login fetch error: ', e);
						}
					)
					.then((body) => {
						console.log('Token verify - 66:', body);
					})
					.catch((e) => console.log('Get Token id error: ', e));
				// history.push('/');
			})
			.catch((e) => {
				console.log('Error in firebase auth: ', e);
				setCurrUser({});
				setIsLogin(false);
			});
	};

	const logout = () => {
		// console.log("Logged out: ", Date.now());
		currUser
			.getIdToken()
			.then((id_token) => {
				fetch('http://127.0.0.1:5000/api/session_logout', {
					mode: 'cors',
				})
					.then((resp) => resp.json())
					.then(console.log)
					.catch((e) => {
						console.log('Session logout fetch error: ', e);
					});
			})
			.catch((e) => console.log('Get Token id error: ', e));
		firebase.auth().signOut();
		setIsLogin(false);
		setCurrUser({});
	};

	return (
		<AuthContext.Provider value={{ isLogin, currUser, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);

	function verifyToken(id_token) {
		return fetch('/api/sessionLogin', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ idToken: id_token }),
		});
	}
}

export default AuthContextProvider;
