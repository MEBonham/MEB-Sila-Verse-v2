import React, { useEffect, useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

const NewDefenses = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);

    return(
        <section className="defenses">
            <h2>Defenses</h2>
            <div className="defenses-div">
                <div className="defense-div">
                    <label>Dodge</label>
                    <input
                        type="number"
                        id="baseDodge"
                        placeholder="Base"
                        onChange={handleInputChange}
                        value={inputs.baseDodge || 0}
                        required
                    />
                    <input
                        type="text"
                        id="effDodge"
                        placeholder="Effective"
                        onChange={handleInputChange}
                        value={inputs.effDodge || ""}
                        required
                    />
                </div>
                <div className="defense-div">
                    <label>Parry</label>
                    <input
                        type="number"
                        id="baseParry"
                        placeholder="Base"
                        onChange={handleInputChange}
                        value={inputs.baseParry || 0}
                        required
                    />
                    <input
                        type="text"
                        id="effParry"
                        placeholder="Effective"
                        onChange={handleInputChange}
                        value={inputs.effParry || ""}
                        required
                    />
                </div>
                <div className="defense-buffer" />
                <div className="defense-div">
                    <label>Fortitude</label>
                    <input
                        type="number"
                        id="baseFortitude"
                        placeholder="Base"
                        onChange={handleInputChange}
                        value={inputs.baseFortitude || 0}
                        required
                    />
                    <input
                        type="text"
                        id="effFortitude"
                        placeholder="Effective"
                        onChange={handleInputChange}
                        value={inputs.effFortitude || ""}
                        required
                    />
                </div>
                <div className="defense-div">
                    <label>Toughness</label>
                    <input
                        className="singular-input"
                        type="text"
                        id="effToughness"
                        placeholder="Effective"
                        onChange={handleInputChange}
                        value={inputs.effToughness || ""}
                        required
                    />
                </div>
                <div className="defense-div">
                    <label>Will</label>
                    <input
                        type="number"
                        id="baseWill"
                        placeholder="Base"
                        onChange={handleInputChange}
                        value={inputs.baseWill || 0}
                        required
                    />
                    <input
                        type="text"
                        id="effWill"
                        placeholder="Effective"
                        onChange={handleInputChange}
                        value={inputs.effWill || ""}
                        required
                    />
                </div>
                <div className="defensive-roll">
                    <label>Amount of Toughness from Defensive Roll</label>
                    <input
                        type="number"
                        id="defRoll"
                        onChange={handleInputChange}
                        value={inputs.defRoll || 0}
                        required
                    />
                </div>
                <div className="textarea">
                    <label htmlFor={`altAbilities`}>Alternate Defenses (can include HTML)</label>
                    <textarea
                        id={`altAbilities`}
                        onChange={handleInputChange}
                        value={inputs.altAbilities || ""}
                        placeholder=""
                        rows="5"
                        cols="70"
                    />
                </div>
            </div>
        </section>
    );
}

export default NewDefenses;