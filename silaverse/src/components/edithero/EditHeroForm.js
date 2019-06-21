import React, { useState, useEffect, useGlobal } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';
import { EditProvider } from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';

import { fixBlankInputFields, purgeProblemCharacters, packageHeroForDB, packageHeroForGlobal } from './EditHelperFcts';
import EditAbilities from './EditAbilities';
import EditPowers from './EditPowers';
import EditAdvantages from './EditAdvantages';
import EditSkills from './EditSkills';
import EditDefenses from './EditDefenses';
import EditOffense from './EditOffense';
import EditComplications from './EditComplications';
import EditBio from './EditBio';
import EditNotes from './EditNotes';

import '../../css/HeroInfoForm.css';

const EditHeroForm = props => {

    firebase.auth.onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/login");
        }
    });

    const { urlid } = props.match.params;
    const db = firebase.db;
    const [ prevHeroes, setPrevHeroes ] = useGlobal("heroes");

    const [ abilitiesInfo, setAbilitiesInfo ] = useState({});
    const [ powerInfo, setPowerInfo ] = useState([]);
    const [ totalPowersCost, setTotalPowersCost ] = useState(0);
    const [ advantagesInfo, setAdvantagesInfo ] = useState({});
    const [ skillsInfo, setSkillsInfo ] = useState({});
    const [ defensesInfo, setDefensesInfo ] = useState({});
    const [ offenseInfo, setOffenseInfo ] = useState({});
    const [ complicationsInfo, setComplicationsInfo ] = useState([]);
    const [ bioInfo, setBioInfo ] = useState("");
    const [ notesInfo, setNotesInfo ] = useState("");
    
    useEffect(() => {
        if (urlid.includes(".")) {
            db.collection("forms").doc(urlid)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        setInputs({
                            urlid: doc.data().urlid.split(".")[1],
                            name: doc.data().name,
                            formTitle: doc.data().formTitle,
                            identity: doc.data().identity,
                            heroType: doc.data().heroType,
                            subHero: doc.data().subHero,
                            powerLevel: doc.data().powerLevel
                        });
                        setAbilitiesInfo(JSON.parse(doc.data().abilities));
                        setPowerInfo(JSON.parse(doc.data().powers));
                        setTotalPowersCost(doc.data().totalPowersCost);
                        setAdvantagesInfo({
                            advantagesList: doc.data().advantagesList,
                            totalAdvantagesCost: doc.data().totalAdvantagesCost,
                            totalEquipmentCost: doc.data().totalEquipmentCost,
                            equipmentInfo: doc.data().equipmentInfo,
                            languagesInfo: doc.data().languages
                        });
                        setSkillsInfo({
                            ...JSON.parse(doc.data().skills),
                            altSkills: doc.data().altSkills
                        });
                        setDefensesInfo(JSON.parse(doc.data().defenses));
                        setOffenseInfo(JSON.parse(doc.data().offense));
                        setComplicationsInfo(JSON.parse(doc.data().complications));
                        setBioInfo(doc.data().bio);
                        setNotesInfo(doc.data().notes);
                    } else {
                        console.log("No hero was found matching this url.");
                    }
                })
        } else {
            db.collection("heroes").where("urlid", "==", urlid)
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        const heroId = querySnapshot.docs[0].id;
                        const heroPrevData = db.collection("heroes").doc(heroId);
                        heroPrevData.get()
                            .then(doc => {
                                setInputs({
                                    urlid: doc.data().urlid,
                                    name: doc.data().name,
                                    formTitle: doc.data().formTitle,
                                    identity: doc.data().identity,
                                    heroType: doc.data().heroType,
                                    subHero: doc.data().subHero,
                                    powerLevel: doc.data().powerLevel
                                });
                                setAbilitiesInfo(JSON.parse(doc.data().abilities));
                                setPowerInfo(JSON.parse(doc.data().powers));
                                setTotalPowersCost(doc.data().totalPowersCost);
                                setAdvantagesInfo({
                                    advantagesList: doc.data().advantagesList,
                                    totalAdvantagesCost: doc.data().totalAdvantagesCost,
                                    totalEquipmentCost: doc.data().totalEquipmentCost,
                                    equipmentInfo: doc.data().equipmentInfo,
                                    languagesInfo: doc.data().languages
                                });
                                setSkillsInfo({
                                    ...JSON.parse(doc.data().skills),
                                    altSkills: doc.data().altSkills
                                });
                                setDefensesInfo(JSON.parse(doc.data().defenses));
                                setOffenseInfo(JSON.parse(doc.data().offense));
                                setComplicationsInfo(JSON.parse(doc.data().complications));
                                setBioInfo(doc.data().bio);
                                setNotesInfo(doc.data().notes);
                            })
                            .catch(err => {
                                console.log("Error getting hero data: ", err);
                            });
                    } else {
                        console.log("No hero was found matching this url.");
                    }
                })
                .catch(err => {
                    console.log("Error getting hero that goes with this page in order to edit: ", err);
                });
        }
    }, [ urlid ]);

    const sendInfo = () => {
        const inputsCopy = purgeProblemCharacters(fixBlankInputFields(inputs));
        if (urlid.includes(".")) {
            const editedHero = packageHeroForDB(inputsCopy);
            editedHero.urlid = `${urlid.split(".")[0]}.${inputsCopy.urlid}`;
            db.collection("forms").doc(urlid)
                .set(editedHero)
                .then(() => {
                    props.history.push(`/viewhero/${urlid.split(".")[0]}`);
                })
                .catch(err => {
                    console.log("Error editing form:", err);
                });
        } else {
            db.collection("heroes").where("urlid", "==", urlid)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        console.log("Cannot find hero matching this page's URL.");
                    } else {
                        const heroId = querySnapshot.docs[0].id;
                        const editedHero = packageHeroForDB(inputsCopy);
                        db.collection("heroes").doc(heroId)
                            .set(editedHero)
                            .then(() => {
                                const minusOneHero = prevHeroes.filter(hero => hero.urlid !== urlid);
                                const formattedHero = packageHeroForGlobal(heroId, editedHero);
                                setPrevHeroes([
                                    ...minusOneHero,
                                    formattedHero
                                ]);
                                props.history.push(`/viewhero/${inputs.urlid}`);
                            })
                            .catch(err => {
                                console.log("Error editing hero: ", err);
                            });
                    }
                })
                .catch(err => {
                    console.log("Error getting hero that goes with this page in order to edit: ", err);
                });
        }
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this hero?")) {
            if (urlid.includes(".")) {
                db.collection("heroes").where("urlid", "==", urlid.split(".")[0])
                    .get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty) {
                            console.log("Cannot find master hero matching this page.");
                        } else {
                            const masterId = querySnapshot.docs[0].id;
                            db.collection("heroes").doc(masterId)
                                .get()
                                .then(doc => {
                                    const masterCopy  = JSON.parse(JSON.stringify(doc.data()));
                                    const indexToDelete = masterCopy.forms.indexOf(urlid.split(".")[1]);
                                    if (indexToDelete > -1) {
                                        masterCopy.forms.splice(indexToDelete, 1);
                                    }
                                    db.collection("heroes").doc(masterId)
                                        .set(masterCopy)
                                        .then(() => {
                                            db.collection("forms").doc(urlid)
                                                .delete()
                                                .then(() => {
                                                    props.history.push(`/viewhero/${urlid.split(".")[0]}`);
                                                })
                                                .catch(err => {
                                                    console.log("Error deleting form:", err);
                                                })
                                        })
                                        .catch(err => {
                                            console.log("Error removing form from master's list of forms:", err);
                                        })
                                })
                        }
                    })
            } else {
                db.collection("heroes").where("urlid", "==", urlid)
                    .get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty) {
                            console.log("Cannot find hero matching this page.");
                        } else {
                            const heroId = querySnapshot.docs[0].id;
                            db.collection("heroes").doc(heroId)
                                .delete()
                                .then(() => {
                                    const minusOneHero = prevHeroes.filter(hero => hero.urlid !== urlid);
                                    setPrevHeroes([
                                        ...minusOneHero
                                    ]);
                                    props.history.push("/");
                                })
                                .catch(err => {
                                    console.log("Error deleting hero from database: ", err);
                                });
                        }
                    })
                    .catch(err => {
                        console.log("Error retrieving hero from database: ", err);
                    });
            }
        }
    }

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(sendInfo);

    return(
        <EditProvider value={{
            inputs,
            setInputs,
            handleInputChange,
            abilitiesInfo,
            powerInfo,
            totalPowersCost,
            advantagesInfo,
            skillsInfo,
            defensesInfo,
            offenseInfo,
            complicationsInfo,
            bioInfo,
            notesInfo
        }}>
            <section className="hero-info-form-envelope">
                <img src={deleteIcon} alt="Delete Hero" onClick={handleDelete} className="delete-hero-button" />
                <form className="hero-info-form" onSubmit={handleSubmit}>
                    <header>
                        <h1>Edit Hero Info</h1>
                        <label htmlFor="urlid">URL ID</label>
                        <input
                            type="text"
                            id="urlid"
                            onChange={handleInputChange}
                            value={inputs.urlid || ""}
                            required
                        />
                        <div className="hero-name-block">
                            <div>
                                <label htmlFor="name">Heroic Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    onChange={handleInputChange}
                                    value={inputs.name || ""}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="formTitle">Form Title (if hero has multiple Forms)</label>
                                <input
                                    type="text"
                                    id="formTitle"
                                    onChange={handleInputChange}
                                    value={inputs.formTitle || ""}
                                />
                            </div>
                        </div>
                        <label htmlFor="identity">Identity</label>
                        <input
                            type="text"
                            id="identity"
                            onChange={handleInputChange}
                            value={inputs.identity || ""}
                        />
                        <div className="hero-type-block">
                            <div>
                                <label htmlFor="heroType">Hero Type</label>
                                <input
                                    type="text"
                                    id="heroType"
                                    placeholder="Original? NPC or PC?"
                                    onChange={handleInputChange}
                                    value={inputs.heroType || ""}
                                />
                            </div>
                            <div>
                                <label htmlFor="heroType">Sub-Hero Of?</label>
                                <input
                                    type="text"
                                    id="subHero"
                                    placeholder={`Dummy\\dummy or *dummy`}
                                    onChange={handleInputChange}
                                    value={inputs.subHero || ""}
                                    disabled={urlid.includes(".") ? true : false}
                                />
                            </div>
                        </div>
                        <label htmlFor="powerLevel">Power Level</label>
                        <input
                            type="number"
                            id="powerLevel"
                            placeholder={10}
                            onChange={handleInputChange}
                            value={inputs.powerLevel || 10}
                            required
                        />
                    </header>
                    <EditAbilities />
                    <EditPowers />
                    <EditAdvantages />
                    <EditSkills />
                    <EditDefenses />
                    <EditOffense />
                    <EditComplications />
                    <EditBio />
                    <EditNotes />
                    <div className="save-button-div">
                        <button type="submit" className="submit-button">Save Hero</button>
                    </div>
                </form>
            </section>
        </EditProvider>
    );
}

export default EditHeroForm;