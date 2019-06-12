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
                    if (!sortedNames.includes(doc.id)) {
                        setSortedNames(sortedNames => ([
                            ...sortedNames,
                            doc.id
                        ]));
                    }
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
    }, [ orgObject, sortedNames ]);

    // useEffect(() => {
    //     console.log(coveredHeroes);
    // }, [ coveredHeroes ]);

    const saveNewFolder = () => {
        // console.log("Time to add a new folder to the db:", inputs.newFolderInput);
        db.collection("folders").get()
            .then(querySnapshot => {
                // console.log(querySnapshot);
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

    const handleDelete = ev => {
        // console.log(ev.target.getAttribute("ordernum"));
        const folderNum = parseInt(ev.target.getAttribute("ordernum"));
        if (window.confirm("Are you sure you want to delete this folder? Its heroes will become Uncategorized.")) {
            const folderName = ev.target.id.substring(4);
            db.collection("folders").doc(folderName).delete()
                .then(() => {
                    for (let i = folderNum + 1; i < sortedNames.length; i++) {
                        const folderToModify = sortedNames[i];
                        db.collection("folders").doc(folderToModify)
                            .set({
                                orderNum: i - 1
                            }, { merge: true })
                            .catch(err => {
                                console.log(`Error adjusting orderNum for subsequent folder ${folderToModify}:`, err);
                            });
                    }
                    const modArr = sortedNames.slice();
                    modArr.splice(folderNum, 1);
                    setSortedNames(modArr);
                })
                .catch(err => {
                    console.log("Error deleting folder:", err);
                });
        }
    }

    const handleUp = ev => {
        const index = parseInt(ev.target.id.substring(10));
        swapFolders(index - 1, index);
    }

    const handleDown = ev => {
        const index = parseInt(ev.target.id.substring(12));
        swapFolders(index, index + 1);
    }

    const swapFolders = (a, b) => {
        const name1 = sortedNames[a];
        const name2 = sortedNames[b];
        db.collection("folders").doc(name1)
            .set({
                orderNum: b
            }, { merge: true })
            .then(() => {
                db.collection("folders").doc(name2)
                    .set({
                        orderNum: a
                    }, { merge: true })
                    .then(() => {
                        const modArr = sortedNames.slice();
                        modArr[a] = name2;
                        modArr[b] = name1;
                        setSortedNames(modArr);
                    })
                    .catch(err => {
                        console.log(`Error resolving swapFolders:`, err);
                    });
            })
            .catch(err => {
                console.log(`Error modifying folder ${name1}:`, err);
            });
    }

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(saveNewFolder);

    return(
        <section className="organization-envelope">
            <h1>Organize Heroes</h1>
            {sortedNames.map((folderName, i) => (
                <section key={folderName}>
                    <div className="heading-and-controls">
                        <h2>{folderName}</h2>
                        <div className="controls">
                            <img src={deleteIcon} alt="Delete Folder" onClick={handleDelete} id={`del-${folderName}`} ordernum={i} />
                            <div className="arrow-icons">
                                {i > 0 ?
                                    <img src={upArrow} alt="Move Folder Up" id={`up-button-${i}`} onClick={handleUp} /> :
                                    null}
                                {i < sortedNames.length - 1 ?
                                    <img src={downArrow} alt="Move Folder Down" id={`down-button-${i}`} onClick={handleDown} /> :
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