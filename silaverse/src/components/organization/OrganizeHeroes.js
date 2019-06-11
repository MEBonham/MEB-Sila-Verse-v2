import React, { useState, useEffect, useGlobal } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';
import HeroWithFolderDropdown from './HeroWithFolderDropdown';

import '../../css/Organization.css';

const OrganizeHeroes = props => {

    firebase.auth.onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/login");
        }
    });

    const [ orgObject, setOrgObject ] = useState({});
    const [ coveredHeroes, setCoveredHeroes ] = useState([]);
    const [ refreshFlag, setRefreshFlag ] = useState(0);
    const [ heroes ] = useGlobal('heroes');

    const db = firebase.db;
    useEffect(() => {
        // console.log("Refresh fired");
        db.collection("folders").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    // console.log(doc.data());
                    setOrgObject(orgObject => ({
                        ...orgObject,
                        [doc.id]: JSON.parse(doc.data().heroes)
                    }));
                });
            })
            .catch(err => {
                console.log("Error initializing orgObject:", err);
            });
    }, [ refreshFlag ]);

    useEffect(() => {
        // console.log(orgObject);
        let arr = [];
        Object.keys(orgObject).forEach(folderName => {
            arr = [
                ...arr,
                ...orgObject[folderName]
            ];
        })
        setCoveredHeroes(arr);
    }, [ orgObject ]);

    // useEffect(() => {
    //     console.log(coveredHeroes);
    // }, [ coveredHeroes ]);

    const saveNewFolder = () => {
        // console.log("Time to add a new folder to the db:", inputs.newFolderInput);
        db.collection("folders").doc(inputs.newFolderInput).set({
            heroes: "[]"
        })
        .then(() => {
            setInputs({
                ...inputs,
                newFolderInput: ""
            });
            setRefreshFlag(refreshFlag + 1);
        })
        .catch(err => {
            console.log("Error adding new folder to db:", err);
        });
    }

    // useEffect(() => {
    //     console.log(orgObject);
    //     console.log(Object.keys(orgObject));
    // });

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(saveNewFolder);

    return(
        <section className="organization-envelope">
            <h1>Organize Heroes</h1>
            {Object.keys(orgObject).map(folderName => (
                <section key={folderName}>
                    <h2>{folderName}</h2>
                    <ul>
                        {orgObject[folderName].map((heroId, i) => {
                            const hero = heroes.filter(heroObj => (heroObj.id === heroId))[0];
                            return(<HeroWithFolderDropdown
                                key={heroId}
                                id={heroId}
                                name={hero.name}
                                orderNum={i}
                                outOf={orgObject[folderName].length}
                                folders={Object.keys(orgObject)}
                                prevFolder={folderName}
                                refreshFlag={refreshFlag}
                                setRefreshFlag={setRefreshFlag}
                            />);
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
                    {heroes ? heroes.filter(hero => (!coveredHeroes.includes(hero.id))).map((heroObj, i) => (
                        <HeroWithFolderDropdown
                            key={heroObj.id}
                            id={heroObj.id}
                            name={heroObj.name}
                            orderNum={i}
                            outOf={heroes.filter(hero => (!coveredHeroes.includes(hero.id))).length}
                            folders={Object.keys(orgObject)}
                            prevFolder="uncategorized"
                            refreshFlag={refreshFlag}
                            setRefreshFlag={setRefreshFlag}
                        />
                    )) : null}
                </ul>
            </section>
        </section>
    )
}

export default OrganizeHeroes;