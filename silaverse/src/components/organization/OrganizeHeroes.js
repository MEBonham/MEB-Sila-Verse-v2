import React, { useState, useEffect, useGlobal } from 'reactn';

import firebase from '../../fbConfig';

import deleteIcon from '../../images/delete-icon.png';
import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';

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
    const [ sortedNames, setSortedNames ] = useState([]);
    const [ coveredHeroes, setCoveredHeroes ] = useState([]);
    const [ refreshFlag, setRefreshFlag ] = useState(0);
    const [ heroes ] = useGlobal('heroes');

    const db = firebase.db;
    useEffect(() => {
        // console.log("Refresh fired");
        db.collection("folders").orderBy("orderNum")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    // console.log(doc.data());
                    setOrgObject(orgObject => ({
                        ...orgObject,
                        [doc.id]: JSON.parse(doc.data().heroes)
                    }));
                    setSortedNames(sortedNames => ([
                        ...sortedNames,
                        doc.id
                    ]));
                });
            })
            .catch(err => {
                console.log("Error initializing orgObject:", err);
            });
    }, [ refreshFlag ]);

    useEffect(() => {
        // console.log(orgObject);
        let arr = [];
        sortedNames.forEach(folderName => {
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
        db.collection("folders").get()
            .then(querySnapshot => {
                console.log(querySnapshot);
                db.collection("folders").doc(inputs.newFolderInput).set({
                    heroes: "[]",
                    orderNum: querySnapshot.docs.length
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
            })
            .catch(err => {
                console.log("Error counting the number of folders already extant:", err);
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
            {sortedNames.map((folderName, i) => (
                <section key={folderName}>
                    <div className="heading-and-controls">
                        <h2>{folderName}</h2>
                        <div className="controls">
                            <img src={deleteIcon} alt="Delete Folder" />
                            <div className="arrow-icons">
                                {i > 0 ?
                                    <img src={upArrow} alt="Move Folder Up" /> :
                                    null}
                                {i < sortedNames.length - 1 ?
                                    <img src={downArrow} alt="Move Folder Down" /> :
                                    null}
                            </div>
                        </div>
                    </div>
                    <ul>
                        {orgObject[folderName].map((heroId, j) => {
                            const hero = heroes.filter(heroObj => (heroObj.id === heroId))[0];
                            return(<HeroWithFolderDropdown
                                key={heroId}
                                id={heroId}
                                name={hero.name}
                                orderNum={j}
                                outOf={orgObject[folderName].length}
                                folders={sortedNames}
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
                    {heroes ? heroes.filter(hero => (!coveredHeroes.includes(hero.id))).map((heroObj, j) => (
                        <HeroWithFolderDropdown
                            key={heroObj.id}
                            id={heroObj.id}
                            name={heroObj.name}
                            orderNum={j}
                            outOf={heroes.filter(hero => (!coveredHeroes.includes(hero.id))).length}
                            folders={sortedNames}
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