import React from 'react';
import Navbar from './components/layout/navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/home';
import About from './components/pages/about';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Alert from './components/layout/alert';
import setAuthToken from './components/utils/setAuthToken';
import PrivateRoute from './components/routing/privateRoute';

const App = () => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    return(
        <Router >
                <Navbar />
                <Alert />
                <Switch>
                    <PrivateRoute exact path='/' component={Home}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/login' component={Login}/>
                </Switch>
        </Router>
        
    )
}

export default App;