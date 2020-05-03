import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './global.css';
// Pages
import News from './components/pages/home';
import AddArticle from './components/pages/addArticle';
import Error404 from './components/pages/error404'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/"  component={News} />
				<Route path="/add-article" component={AddArticle} />
				<Route path="/edit-article/:id" component={AddArticle} />
				<Route path='*' component={Error404} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
