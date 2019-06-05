import React, { useState, useGlobal } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';
import { NewProvider } from '../../hooks/NewMultiformContext';

import { fixBlankInputFields, packageHeroForDB, packageHeroForGlobal } from '../edithero/EditHelperFcts';
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
    // const [ powerInfo ] = useState([]);
    // const [ totalPowersCost ] = useState(0);
    // const [ advantagesInfo ] = useState({
    //     totalAdvantagesCost: 0,
    //     advantagesList: ""
    // });

    const [ prevHeroes, setHeroes ] = useGlobal("heroes");
    const sendInfo = () => {
        const db = firebase.db;
        const inputsCopy = fixBlankInputFields(inputs);
        const newHero = packageHeroForDB(inputsCopy);
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
                    <NewAbilities />
                    <NewPowers />
                    <NewAdvantages />
                    <NewSkills />
                    <NewDefenses />
                    <NewOffense />
                    <NewComplications />
                    <NewBio />
                    <NewNotes />
                    <button type="submit" className="submit-button">Create New Hero</button>
                </form>
            </section>
        </NewProvider>
    );
}

export default NewHeroForm;