import React, { useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

const NewOffense = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);

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
                <textarea
                    id={`attacksList`}
                    onChange={handleInputChange}
                    value={inputs.attacksList || ""}
                    placeholder=""
                    rows="5"
                    cols="70"
                />
            </div>
        </section>
    );
}

export default NewOffense;