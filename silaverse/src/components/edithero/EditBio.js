import React, { useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

const EditBio = () => {

    const { inputs, setInputs, handleInputChange, bioInfo } = useContext(EditMultiformContext);

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

export default EditBio;