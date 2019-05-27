import React, { useState, useEffect } from 'reactn';
import { Link } from 'react-router-dom';

import firebase from '../../fbConfig';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Header = () => {

    const [ links, setLinks ] = useState(<p className="logout">Loading ...</p>);
    const [ userInfo, setUserInfo ] = useState(null);
    const [ firstMount, setFirstMount ] = useState(true);
    const [ blinkTimer, setBlinkTimer ] = useState(false);

    useEffect(() => {
        if (firstMount) {
            setFirstMount(false);
        } else {
            if (userInfo) {
                setLinks(<SignedInLinks />);
            } else {
                setLinks(<SignedOutLinks />);
            }
        }
    }, [ userInfo, blinkTimer ]);
    
    firebase.auth.onAuthStateChanged(user => {
        setUserInfo(user);
    });

    // Ensure that useEffect() runs after a certain interval even if no onAuthStateChanged event has fired:
    setTimeout(() => {
        setBlinkTimer(true);
    }, 300);

    return(
        <header>
            <h1><Link to="/">The Sila-Verse</Link></h1>
            {links}
        </header>
    );
}

export default Header;