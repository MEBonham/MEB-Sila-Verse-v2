import React, { useState, useEffect, useGlobal } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';

import '../../css/Organization.css';

const OrganizeHeroes = props => {

    firebase.auth.onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/login");
        }
    });

    const [ orgObject, setOrgObject ] = useState({});
    const [ heroes ] = useGlobal('heroes');

    const db = firebase.db;
    useEffect(() => {
        db.collection("folders").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    // orgObject[doc.data().name] = JSON.parse(doc.data().heroes);
                    setOrgObject({
                        ...orgObject,
                        [doc.data().name]: JSON.parse(doc.data().heroes)
                    })
                });
            })
            .catch(err => {
                console.log("Error initializing folders:", err);
            });
    }, []);

    const saveNewFolder = () => {
        console.log("Time to add a new folder to the db.");
    }

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(saveNewFolder);

    return(
        <section className="organization-envelope">
            <h1>Organize Heroes</h1>
            {Object.keys(orgObject).map(folderName => (
                <section key={folderName}>
                    <h2>{folderName}</h2>
                    <ul>
                        {orgObject[folderName].map(heroId => {
                            const hero = heroes.filter(heroObj => (heroObj.id === heroId))[0];
                            return(<li key={heroId}>{hero.name}</li>);
                        })}
                    </ul>
                </section>
            ))}
            <form onSubmit={handleSubmit}>
                <label htmlFor="newFolderInput">Add New Folder:</label>
                <input
                    type="text"
                    id="newFolderInput"
                    value={inputs.newFolderInput || ""}
                    onChange={handleInputChange}
                />
                <button type="submit">Save Folder</button>
            </form>
            <section>
                <h2>Uncategorized</h2>
                <ul>
                    {heroes ? heroes.filter(hero => (hero.folder === undefined)).map(heroObj => (
                        <li key={heroObj.id}>{heroObj.name}</li>
                    )) : null}
                </ul>
            </section>
        </section>
    )
}

export default OrganizeHeroes;