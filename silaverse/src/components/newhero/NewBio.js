import React, { useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

const NewBio = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);

    return(
        <section className="bio">
            <h2>Bio</h2>
            <div className="textarea">
                <label htmlFor={`bio`}>Bio (can include HTML)</label>
                <textarea
                    id={`bio`}
                    onChange={handleInputChange}
                    value={inputs.bio || ""}
                    placeholder=""
                    rows="8"
                    cols="70"
                />
            </div>
        </section>
    );
}

export default NewBio;