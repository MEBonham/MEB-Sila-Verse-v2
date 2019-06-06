import React, { useContext } from 'reactn';
import { MenuProvider } from 'react-contexify';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu2 from './HTMLHelpContextMenu2';

const NewBio = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);

    return(
        <section className="bio">
            <h2>Bio</h2>
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
                    />
                    <MenuProvider id={`htmlHelp-bio`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu2 menuId={`htmlHelp-bio`} input={`bio`} />
                </div>
            </div>
        </section>
    );
}

export default NewBio;