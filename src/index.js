import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

const Start = () => <div className='StartMenu'>
    <Link to='/table?rows=1000'>
        <button type='button'>BIG SIZE</button>
    </Link>
    <Link to='/table?rows=32'>
        <button type='button'>small size</button>
    </Link>
</div>
const App = () =>
    <Switch>
        <Route exact path='/' component={Start}/>
        <Route path='/table' component={Table}/>
    </Switch>
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
