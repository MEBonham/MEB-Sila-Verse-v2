import React, { useState, useEffect } from 'reactn';

import useForm from '../../hooks/useForm';
import EditSingleAbility from './EditSingleAbility';

const EditAbilities = props => {

    const { abilities } = props;
    const { inputs, handleInputChange } = useForm();
    const noteVal = (abilities && abilities.note) ? abilities.note : "";

    const [ display, setDisplay ] = useState(<div className="abilities-div"></div>);
    useEffect(() => {
        setDisplay(
            <div className="abilities-div">
                <EditSingleAbility abbr="Str" name="Strength" nums={abilities["str"]} />
                <EditSingleAbility abbr="Sta" name="Stamina" nums={abilities["sta"]} />
                <EditSingleAbility abbr="Agl" name="Agility" nums={abilities["agl"]} />
                <EditSingleAbility abbr="Dex" name="Dexterity" nums={abilities["dex"]} />
                <EditSingleAbility abbr="Fgt" name="Fighting" nums={abilities["fgt"]} />
                <EditSingleAbility abbr="Int" name="Intellect" nums={abilities["int"]} />
                <EditSingleAbility abbr="Awe" name="Awareness" nums={abilities["awe"]} />
                <EditSingleAbility abbr="Pre" name="Presence" nums={abilities["pre"]} />
                <input
                    type="text"
                    id="abilitiesNote"
                    placeholder="e.g. Load limit 50 lb."
                    onChange={handleInputChange}
                    value={inputs.abilitiesNote || noteVal}
                />
            </div>
        );
    }, [ abilities ]);

    return(
        <section className="abilities">
            <h2>Abilities</h2>
            {display}
        </section>
    );
}

export default EditAbilities;