import React from 'react';
import './global.css';
import Routes from './routes';
import Header from './components/header'
import Container from '@material-ui/core/Container';

function App() {
	return (
		<>
			<Header />
			<Container fixed>
				<Routes />
			</Container>
		</>
	);
}

export default App;
