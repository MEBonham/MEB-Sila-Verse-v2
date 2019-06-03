import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import firebase from './fbConfig';

import './css/index.css';
import App from './components/App';

// Initialize Global store
setGlobal({
    pptTotals: {
        abilities: 0,
        powers: 0,
        advantages: 0,
        skills: 0,
        defenses: 0
    } 
});

const db = firebase.db;
const heroLib = [];
db.collection("heroes").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const hero = doc.data();
            hero.id = doc.id;
            hero.abilities = JSON.parse(doc.data().abilities);
            hero.powers = JSON.parse(doc.data().powers);
            hero.skills = JSON.parse(doc.data().skills);
            heroLib.push(hero);
        });
        setGlobal({
            heroes: heroLib
        });
    })
    .catch(err => {
        console.log("Error initializing heroes from database:", err);
    });

// Render
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);