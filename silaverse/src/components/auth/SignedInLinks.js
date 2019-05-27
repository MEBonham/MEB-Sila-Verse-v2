import React, { useState, useEffect, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';

import firebase from '../../fbConfig';

const SignedInLinks = () => {

    const [ user ] = useGlobal('user');
    const [ displayName, setDisplayName ] = useState(null);
    useEffect(() => {
        if (user) {
            setDisplayName(<li className="username-display">{user.displayName}</li>);
        }
    }, [ user ]);

    const handleLogout = () => {
        firebase.auth.signOut();
    }

    return(
        <ul>
            {displayName}
            <li><Link to="/register">Register New Admin</Link></li>
            <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
    );
}

export default SignedInLinks;