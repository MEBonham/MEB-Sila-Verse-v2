import React, { useState, useEffect, useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import NewSingleAbility from './NewSingleAbility';

const NewAbilities = () => {

    const { inputs, handleInputChange, abilitiesInfo } = useContext(NewMultiformContext);

    const [ display, setDisplay ] = useState(<div className="abilities-div"></div>);
    useEffect(() => {
        if (abilitiesInfo) {
            if (inputs.abilitiesNote === undefined) {
                inputs.abilitiesNote = abilitiesInfo.note;
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
                </div>
            );
        }
    }, [ abilitiesInfo, inputs.abilitiesNote ]);

    return(
        <section className="abilities">
            <h2>Abilities</h2>
            {display}
        </section>
    );
}

export default NewAbilities;