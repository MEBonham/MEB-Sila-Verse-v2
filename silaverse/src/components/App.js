import React, { setGlobal } from 'reactn';
import { Route } from 'react-router-dom';

import firebase from '../fbConfig';

import Header from './auth/Header';
import Sidebar from './sidebar/Sidebar';
import CharSheet from './main/CharSheet';
import EditHeroForm from './edithero/EditHeroForm';
import NewHeroForm from './newhero/NewHeroForm';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';

import '../css/ContextMenu.css';
import '../css/App.css';

const App = () => {

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            setGlobal({
                user: user
            });
        } else {
            setGlobal({
                user: null
            });
        }
    });

    return(
        <div className="App">
            <Header />
            <Route exact path="/" component={Sidebar} />
            <Route path="/viewhero" component={Sidebar} />
            <Route path="/viewhero/:urlid" component={CharSheet} />
            <Route path="/edithero" component={Sidebar} />
            <Route path="/edithero/:urlid" component={EditHeroForm} />
            <Route path="/newhero" component={Sidebar} />
            <Route path="/newhero" component={NewHeroForm} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={ForgotPassword} />
        </div>
    );
}

export default App;