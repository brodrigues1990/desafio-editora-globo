import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './global.css';
import Routes from './routes';
import Header from './components/header'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {
	return (
		<>
			<Header/>
			<Container fixed>
				<Routes />
			</Container>
		</>
	);
}

export default App;
