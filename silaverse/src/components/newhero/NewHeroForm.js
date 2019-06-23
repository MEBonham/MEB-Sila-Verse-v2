import React, { useState, useGlobal } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';
import { NewProvider } from '../../hooks/NewMultiformContext';

import { fixBlankInputFields, purgeProblemCharacters, packageHeroForDB, packageHeroForGlobal } from '../edithero/EditHelperFcts';
import NewAbilities from './NewAbilities';
import NewPowers from './NewPowers';
import NewAdvantages from './NewAdvantages';
import NewSkills from './NewSkills';
import NewDefenses from './NewDefenses';
import NewOffense from './NewOffense';
import NewComplications from './NewComplications';
import NewBio from './NewBio';
import NewNotes from './NewNotes';

import '../../css/HeroInfoForm.css';

const NewHeroForm = props => {

    firebase.auth.onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/login");
        }
    });

    const [ abilitiesInfo ] = useState({
        str: {},
        sta: {},
        agl: {},
        dex: {},
        fgt: {},
        int: {},
        awe: {},
        pre: {},
        note: ""
    });

    const [ prevHeroes, setHeroes ] = useGlobal("heroes");
    const sendInfo = () => {
        const db = firebase.db;
        const inputsCopy = purgeProblemCharacters(fixBlankInputFields(inputs));
        const newHero = packageHeroForDB(inputsCopy);
        if (inputsCopy.subHero && (inputsCopy.subHero[0] === "*")) {
            const masterUrlid = inputsCopy.subHero.substring(1);
            const formId = inputsCopy.urlid;
            db.collection("heroes").where("urlid", "==", masterUrlid)
                .get()
                .then(querySnapshot => {
                    const masterId = querySnapshot.docs[0].id;
                    db.collection("heroes").doc(masterId)
                        .get()
                        .then(doc => {
                            const masterCopy  = JSON.parse(JSON.stringify(doc.data()));
                            if (!masterCopy.forms) {
                                masterCopy.forms = [];
                            }
                            masterCopy.forms.push(formId);
                            db.collection("heroes").doc(masterId)
                                .set(masterCopy)
                                .then(() => {
                                    newHero.urlid = `${masterUrlid}.${formId}`;
                                    db.collection("forms").doc(`${masterUrlid}.${formId}`)
                                        .set(newHero)
                                        .then(() => {
                                            props.history.push(`/viewhero/${masterUrlid}`);
                                        })
                                        .catch(err => {
                                            console.log("Error adding new form to forms db:", err);
                                        });
                                })
                                .catch(err => {
                                    console.log("Error:", err);
                                });
                        })
                        .catch(err => {
                            console.log("Error:", err);
                        });
                })
                .catch(err => {
                    console.log(`Cannot find hero with urlid ${masterUrlid}:`, err);
                });
        } else {
            db.collection("heroes").add(newHero)
                .then(heroRef => {
                    db.collection("heroes").doc(heroRef.id).get()
                        .then(querySnapshot => {
                            if (!querySnapshot.exists) {
                                console.log("Error getting newly created hero from database.");
                            } else {
                                const newHeroForGlobal = packageHeroForGlobal(heroRef.id, newHero);
                                setHeroes([
                                    ...prevHeroes,
                                    newHeroForGlobal
                                ]);
                                props.history.push(`/viewhero/${newHero.urlid}`);
                            }
                        })
                        .catch(err => {
                            console.log("Error updating global variables with new hero info: ", err);
                        });
                })
                .catch(err => {
                    console.log("Error adding hero to database: ", err);
                });
        }
    }

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(sendInfo);
    
    return(
        // <NewProvider value={{inputs, setInputs, handleInputChange, abilitiesInfo, powerInfo, totalPowersCost, advantagesInfo}}>
        <NewProvider value={{inputs, setInputs, handleInputChange, abilitiesInfo}}>
            <section className="hero-info-form-envelope">
                <form className="hero-info-form" onSubmit={handleSubmit}>
                    <header>
                        <h1>New Hero</h1>
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
                                />
                            </div>
                        </div>
                        <div className="power-level-block">
                            <div>
                                <label htmlFor="powerLevel">Power Level</label>
                                <input
                                    type="number"
                                    id="powerLevel"
                                    placeholder={10}
                                    onChange={handleInputChange}
                                    value={inputs.powerLevel || 10}
                                    required
                                />
                            </div>
                            <div className="checkbox">
                                <label htmlFor="excludeFromAnalysis">Exclude this hero from Analysis section?</label>
                                <input
                                    type="checkbox"
                                    id="excludeFromAnalysis"
                                    onChange={handleInputChange}
                                    checked={inputs.excludeFromAnalysis || false}
                                />
                            </div>
                        </div>
                    </header>
                    <NewAbilities />
                    <NewPowers />
                    <NewAdvantages />
                    <NewSkills />
                    <NewDefenses />
                    <NewOffense />
                    <NewComplications />
                    <NewBio />
                    <NewNotes />
                    <div className="save-button-div">
                        <button type="submit" className="submit-button">Save Hero</button>
                    </div>
                </form>
            </section>
        </NewProvider>
    );
}

export default NewHeroForm;