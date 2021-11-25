import './App.css';
import Login from './components/login';
import Home from './components/Home';
import Signup from './components/Signup';
import AppDrawer from './components/AppDrawer';
import Diet from './components/Diet';
import Devices from './components/Devices';

import React, { useState, createContext } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, CssBaseline, CircularProgress, Container } from '@material-ui/core';

import ProtectedRoute from './components/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';
import AppHeader from './components/AppHeader';
import BluetoothDeviceContextProvider from './contexts/BluetoothDeviceContext';

export const AppContext = createContext('');

function App() {
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [drawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	const handleLoading = (load) => {
		setLoading(load);
	};

	return (
		<AppContext.Provider value={{ handleDrawerOpen, handleLoading }}>
			{/* <Router> */}
			{loading && (
				<Container
					style={{
						height: '99vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						// position: 'absolute',
						// top: '0px',
						// left: '0px',
						zIndex: 1000,
						backgroundColor: 'white',
						width: '100%',
					}}>
					<CircularProgress color='secondary' size={100} />
				</Container>
			)}
			<AuthContextProvider>
				<CssBaseline />

				<Grid container direction='column'>
					<BluetoothDeviceContextProvider>
						<AppHeader />
					</BluetoothDeviceContextProvider>
					<AppDrawer open={drawerOpen} onClose={handleDrawerClose} />
					{/* <BluetoothDeviceContextProvider> */}
					<Switch>
						<Route path='/login' exact component={Login} />
						<Route path='/register' exact component={Signup} />
						<ProtectedRoute path='/' exact>
							<Home />
						</ProtectedRoute>
						<ProtectedRoute path='/diet' exact>
							<Diet />
						</ProtectedRoute>
						<ProtectedRoute path='/devices' exact>
							{/* <BluetoothDeviceContextProvider> */}
							<Devices />
							{/* </BluetoothDeviceContextProvider> */}
						</ProtectedRoute>
						<Route path='*'>
							<div>403 error</div>
						</Route>
					</Switch>
					{/* </BluetoothDeviceContextProvider> */}
				</Grid>
			</AuthContextProvider>
			{/* </Router> */}
		</AppContext.Provider>
	);
}

export default App;
