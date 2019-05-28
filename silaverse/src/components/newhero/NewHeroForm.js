import React, { useState } from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';
import { NewProvider } from '../../hooks/NewMultiformContext';

import { fixBlankInputFields, packageHeroForDB, packageHeroForGlobal } from '../edithero/EditHelperFcts';
import NewAbilities from './NewAbilities';

const NewHeroForm = props => {

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

    const sendInfo = () => {
        const inputsCopy = fixBlankInputFields(inputs);
        console.log(inputsCopy);
    }

    const { inputs, setInputs, handleInputChange, handleSubmit } = useForm(sendInfo);
    
    return(
        <NewProvider value={{inputs, handleInputChange, abilitiesInfo}}>
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
                    <button type="submit">Create New Hero</button>
                </form>
            </section>
        </NewProvider>
    );
}

export default NewHeroForm;