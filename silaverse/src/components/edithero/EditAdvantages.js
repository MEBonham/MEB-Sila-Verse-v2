import React, { useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

const EditAdvantages = () => {

    const { inputs, handleInputChange, advantagesInfo } = useContext(EditMultiformContext);

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

export default EditAdvantages;