import React, { useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

const EditOffense = () => {

    const { inputs, setInputs, handleInputChange, offenseInfo } = useContext(EditMultiformContext);

    useEffect(() => {
        if (offenseInfo) {
            setInputs(inputs => ({
                ...inputs,
                initiative: offenseInfo.initiative,
                attacksList: offenseInfo.attacksList
            }));
        }
    }, [ offenseInfo ]);

    return(
        <section className="offense">
            <h2 id="offense-section">Offense</h2>
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
                <textarea
                    id={`attacksList`}
                    onChange={handleInputChange}
                    value={inputs.attacksList || ""}
                    placeholder=""
                    rows="7"
                    cols="70"
                />
            </div>
        </section>
    );
}

export default EditOffense;