import React, { useEffect, useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu from './HTMLHelpContextMenu';

const EditNotes = () => {

    const { inputs, setInputs, handleInputChange, notesInfo } = useContext(EditMultiformContext);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (notesInfo) {
            setInputs(inputs => ({
                ...inputs,
                notes: notesInfo
            }));
        }
    }, [ notesInfo ]);

    return(
        <section className="notes">
            <h2 id="notes-section">Notes</h2>
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
                    <HTMLHelpContextMenu menuId={`htmlHelp-notes`} input={`notes`} refProp={textareaRef} />
                </div>
            </div>
        </section>
    );
}

export default EditNotes;