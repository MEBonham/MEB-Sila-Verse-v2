import React, { useState, useEffect, useGlobal } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';
import { EditProvider } from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';

import { fixBlankInputFields, packageHeroForDB, packageHeroForGlobal } from './EditHelperFcts';
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
                                identity: doc.data().identity,
                                heroType: doc.data().heroType,
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
    }, [ urlid ]);

    const sendInfo = () => {
        const inputsCopy = fixBlankInputFields(inputs);
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

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this hero?")) {
            db.collection("heroes").where("urlid", "==", urlid).get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        console.log("Cannot find hero matching this page.");
                    } else {
                        const heroId = querySnapshot.docs[0].id;
                        db.collection("heroes").doc(heroId).delete()
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
                        <label htmlFor="name">Heroic Name</label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleInputChange}
                            value={inputs.name || ""}
                            required
                        />
                        <label htmlFor="identity">Identity</label>
                        <input
                            type="text"
                            id="identity"
                            onChange={handleInputChange}
                            value={inputs.identity || ""}
                        />
                        <label htmlFor="heroType">Hero Type</label>
                        <input
                            type="text"
                            id="heroType"
                            placeholder="Original? NPC or PC?"
                            onChange={handleInputChange}
                            value={inputs.heroType || ""}
                        />
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