import React, { useState, useEffect, useGlobal, setGlobal } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';
import { EditProvider } from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';

import { fixBlankInputFields, packageHeroForDB, packageHeroForGlobal } from './EditHelperFcts';
import EditAbilities from './EditAbilities';

const EditHeroForm = props => {

    const { urlid } = props.match.params;
    const db = firebase.db;
    const [ prevHeroes ] = useGlobal("heroes");

    const [ abilitiesInfo, setAbilitiesInfo ] = useState({});
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
                            setGlobal({
                                heroes: [
                                    ...minusOneHero,
                                    formattedHero
                                ]
                            });
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

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(sendInfo);

    return(
        <EditProvider value={{inputs, handleInputChange, abilitiesInfo}}>
            <section className="hero-info-form-envelope">
                <img src={deleteIcon} alt="Delete Hero" className="delete-hero-button" />
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
                    <button type="submit">Save Hero</button>
                </form>
            </section>
        </EditProvider>
    );
}

export default EditHeroForm;