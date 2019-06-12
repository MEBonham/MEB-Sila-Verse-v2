import React, { useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu2 from './HTMLHelpContextMenu2';

const NewNotes = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);
    const textareaRef = useRef(null);

    return(
        <section className="notes">
            <h2>Notes</h2>
            <div className="textarea">
                <label htmlFor={`notes`}>Notes (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`notes`}
                        onChange={handleInputChange}
                        value={inputs.notes || ""}
                        placeholder=""
                        rows="8"
                        cols="70"
                        ref={textareaRef}
                    />
                    <MenuProvider id={`htmlHelp-notes`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu2 menuId={`htmlHelp-notes`} input={`notes`} refProp={textareaRef} />
                </div>
            </div>
        </section>
    );
}

export default NewNotes;