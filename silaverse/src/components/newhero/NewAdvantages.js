import React, { useEffect, useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

const NewAdvantages = () => {

    const { inputs, setInputs, handleInputChange, advantagesInfo } = useContext(NewMultiformContext);

    useEffect(() => {
        if (advantagesInfo) {
            setInputs(inputs => ({
                ...inputs,
                totalAdvantagesCost: advantagesInfo.totalAdvantagesCost,
                advantagesList: advantagesInfo.advantagesList
            }));
        }
    }, [ advantagesInfo ]);

    return(
        <section className="advantages">
            <h2>Advantages</h2>
            <label htmlFor="totalPowersCost">Total Cost of Advantages</label>
            <input
                type="number"
                id="totalAdvantagesCost"
                onChange={handleInputChange}
                value={inputs.totalAdvantagesCost || 0}
            />
            <div className="textarea">
                <label htmlFor={`advantagesList`}>List of Advantages (can include HTML)</label>
                <textarea
                    id={`advantagesList`}
                    onChange={handleInputChange}
                    value={inputs.advantagesList || ""}
                    placeholder="Accurate Attack"
                    rows="6"
                    cols="70"
                />
            </div>
        </section>
    );
}

export default NewAdvantages;