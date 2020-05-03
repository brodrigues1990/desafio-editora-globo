import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import AddArticle from './pages/addArticle';
import Error404 from './pages/error404'


export default function Routes() {
    return (
        <BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/add-article" component={AddArticle} />
				<Route path="/edit-article/:id" component={AddArticle} />
				<Route path='*' component={Error404} />
			</Switch>
		</BrowserRouter>
    );
}