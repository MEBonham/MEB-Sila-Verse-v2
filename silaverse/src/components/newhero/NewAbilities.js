import React, { useState, useEffect, useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import NewSingleAbility from './NewSingleAbility';

const NewAbilities = () => {

    const { inputs, handleInputChange, abilitiesInfo } = useContext(NewMultiformContext);
    // const { inputs, handleInputChange } = useContext(NewMultiformContext);

    const [ display, setDisplay ] = useState(<div className="abilities-div"></div>);
    // const [ display ] = useState(
    //     <div className="abilities-div">
    //         <NewSingleAbility abbr="Str" name="Strength" nums={{}} />
    //         <NewSingleAbility abbr="Sta" name="Stamina" nums={{}} />
    //         <NewSingleAbility abbr="Agl" name="Agility" nums={{}} />
    //         <NewSingleAbility abbr="Dex" name="Dexterity" nums={{}} />
    //         <NewSingleAbility abbr="Fgt" name="Fighting" nums={{}} />
    //         <NewSingleAbility abbr="Int" name="Intellect" nums={{}} />
    //         <NewSingleAbility abbr="Awe" name="Awareness" nums={{}} />
    //         <NewSingleAbility abbr="Pre" name="Presence" nums={{}} />
    //         <input
    //             type="text"
    //             id="abilitiesNote"
    //             placeholder="e.g. Load limit 50 lb."
    //             onChange={handleInputChange}
    //             value={inputs.abilitiesNote || ""}
    //         />
    //     </div>
    // );
    useEffect(() => {
        if (abilitiesInfo) {
            if (inputs.abilitiesNote === undefined) {
                inputs.abilitiesNote = abilitiesInfo.note;
            }
            if (inputs.altAbilities === undefined) {
                inputs.altAbilities = abilitiesInfo.altAbilities;
            }
            setDisplay(
                <div className="abilities-div">
                    <NewSingleAbility abbr="Str" name="Strength" nums={abilitiesInfo["str"]} />
                    <NewSingleAbility abbr="Sta" name="Stamina" nums={abilitiesInfo["sta"]} />
                    <NewSingleAbility abbr="Agl" name="Agility" nums={abilitiesInfo["agl"]} />
                    <NewSingleAbility abbr="Dex" name="Dexterity" nums={abilitiesInfo["dex"]} />
                    <NewSingleAbility abbr="Fgt" name="Fighting" nums={abilitiesInfo["fgt"]} />
                    <NewSingleAbility abbr="Int" name="Intellect" nums={abilitiesInfo["int"]} />
                    <NewSingleAbility abbr="Awe" name="Awareness" nums={abilitiesInfo["awe"]} />
                    <NewSingleAbility abbr="Pre" name="Presence" nums={abilitiesInfo["pre"]} />
                    <input
                        type="text"
                        id="abilitiesNote"
                        placeholder="e.g. Load limit 50 lb."
                        onChange={handleInputChange}
                        value={inputs.abilitiesNote || ""}
                    />
                    <div className="textarea">
                        <label htmlFor={`altAbilities`}>Alternate Abilities (can include HTML)</label>
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
            );
        }
    }, [ abilitiesInfo, inputs.abilitiesNote, inputs.altAbilities ]);
    // }, [ abilitiesInfo ]);

    return(
        <section className="abilities">
            <h2>Abilities</h2>
            {display}
        </section>
    );
}

export default NewAbilities;