import React, { useState, useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import EditSingleAbility from './EditSingleAbility';

const EditAbilities = () => {

    const { inputs, handleInputChange, abilitiesInfo } = useContext(EditMultiformContext);
    inputs.abilitiesNote = abilitiesInfo.note;

    const noteVal = (abilitiesInfo && abilitiesInfo.note) ? abilitiesInfo.note : "";

    const [ display, setDisplay ] = useState(<div className="abilities-div"></div>);
    useEffect(() => {
        if (abilitiesInfo) {
            setDisplay(
                <div className="abilities-div">
                    <EditSingleAbility abbr="Str" name="Strength" nums={abilitiesInfo["str"]} />
                    <EditSingleAbility abbr="Sta" name="Stamina" nums={abilitiesInfo["sta"]} />
                    <EditSingleAbility abbr="Agl" name="Agility" nums={abilitiesInfo["agl"]} />
                    <EditSingleAbility abbr="Dex" name="Dexterity" nums={abilitiesInfo["dex"]} />
                    <EditSingleAbility abbr="Fgt" name="Fighting" nums={abilitiesInfo["fgt"]} />
                    <EditSingleAbility abbr="Int" name="Intellect" nums={abilitiesInfo["int"]} />
                    <EditSingleAbility abbr="Awe" name="Awareness" nums={abilitiesInfo["awe"]} />
                    <EditSingleAbility abbr="Pre" name="Presence" nums={abilitiesInfo["pre"]} />
                    <input
                        type="text"
                        id="abilitiesNote"
                        placeholder="e.g. Load limit 50 lb."
                        onChange={handleInputChange}
                        value={inputs.abilitiesNote || noteVal}
                    />
                </div>
            );
        }
    }, [ abilitiesInfo ]);

    return(
        <section className="abilities">
            <h2>Abilities</h2>
            {display}
        </section>
    );
}

export default EditAbilities;