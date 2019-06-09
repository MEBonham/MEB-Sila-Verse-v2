import React from 'reactn';

import firebase from '../../fbConfig';

const OrganizeHeroes = props => {

    firebase.auth.onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/login");
        }
    });

    return(
        <section className="organization-envelope">
            
        </section>
    )
}

export default OrganizeHeroes;