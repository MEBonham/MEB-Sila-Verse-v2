import React, { useEffect, useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu from './HTMLHelpContextMenu';

const EditBio = () => {

    const { inputs, setInputs, handleInputChange, bioInfo } = useContext(EditMultiformContext);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (bioInfo) {
            setInputs(inputs => ({
                ...inputs,
                bio: bioInfo
            }));
        }
    }, [ bioInfo ]);

    return(
        <section className="bio">
            <h2 id="bio-section">Bio</h2>
            <div className="textarea">
                <label htmlFor={`bio`}>Bio (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`bio`}
                        onChange={handleInputChange}
                        value={inputs.bio || ""}
                        placeholder=""
                        rows="8"
                        cols="70"
                        ref={textareaRef}
                    />
                    <MenuProvider id={`htmlHelp-bio`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu menuId={`htmlHelp-bio`} input={`bio`} refProp={textareaRef} />
                </div>
            </div>
        </section>
    );
}

export default EditBio;