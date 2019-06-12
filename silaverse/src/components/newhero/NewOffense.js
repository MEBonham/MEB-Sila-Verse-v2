import React, { useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu2 from './HTMLHelpContextMenu2';

const NewOffense = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);
    const textareaRef = useRef(null);

    return(
        <section className="offense">
            <h2>Offense</h2>
            <div className="initiative">
                <label htmlFor="initiative">Initiative</label>
                <input
                    type="text"
                    id="initiative"
                    onChange={handleInputChange}
                    value={inputs.initiative || "+0"}
                    required
                />
            </div>
            <div className="textarea">
                <label htmlFor={`attacksList`}>Attacks (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`attacksList`}
                        onChange={handleInputChange}
                        value={inputs.attacksList || ""}
                        placeholder=""
                        rows="5"
                        cols="70"
                        ref={textareaRef}
                    />
                    <MenuProvider id={`htmlHelp-attacksList`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu2 menuId={`htmlHelp-attacksList`} input={`attacksList`} refProp={textareaRef} />
                </div>
            </div>
        </section>
    );
}

export default NewOffense;