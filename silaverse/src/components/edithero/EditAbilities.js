import React, { useState, useEffect, useContext } from 'reactn';
import { MenuProvider } from 'react-contexify';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import goldStar from '../../images/gold-star.png';

import EditSingleAbility from './EditSingleAbility';
import HTMLHelpContextMenu from './HTMLHelpContextMenu';

const EditAbilities = () => {

    const { inputs, handleInputChange, abilitiesInfo } = useContext(EditMultiformContext);

    const [ display, setDisplay ] = useState(<div className="abilities-div"></div>);
    useEffect(() => {
        if (abilitiesInfo) {
            inputs.abilitiesNote = abilitiesInfo.note;
            inputs.altAbilities = abilitiesInfo.altAbilities;
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
                </div>
            );
        }
    }, [ abilitiesInfo ]);

    return(
        <section className="abilities">
            <h2 id="abilities-section">Abilities</h2>
            {display}
            <input
                type="text"
                id="abilitiesNote"
                placeholder="e.g. Load limit 50 lb."
                onChange={handleInputChange}
                value={inputs.abilitiesNote || ""}
            />
            <div className="textarea">
                <label htmlFor={`altAbilities`}>Alternate Abilities (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`altAbilities`}
                        onChange={handleInputChange}
                        value={inputs.altAbilities || ""}
                        placeholder=""
                        rows="5"
                        cols="70"
                    />
                    <MenuProvider id={`htmlHelp-altAbilities`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu menuId={`htmlHelp-altAbilities`} input={`altAbilities`} />
                </div>
            </div>
        </section>
    );
}

export default EditAbilities;