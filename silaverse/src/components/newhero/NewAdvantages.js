import React, { useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

const NewAdvantages = () => {

    // const { inputs, setInputs, handleInputChange, advantagesInfo } = useContext(NewMultiformContext);
    const { inputs, handleInputChange } = useContext(NewMultiformContext);

    // useEffect(() => {
    //     if (advantagesInfo) {
    //         setInputs(inputs => ({
    //             ...inputs,
    //             totalAdvantagesCost: advantagesInfo.totalAdvantagesCost,
    //             advantagesList: advantagesInfo.advantagesList,
    //             totalEquipmentCost: advantagesInfo.totalEquipmentCost,
    //             equipmentInfo: advantagesInfo.equipmentInfo,
    //             languagesInfo: advantagesInfo.languagesInfo
    //         }));
    //     }
    // }, [ advantagesInfo ]);

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
            <label htmlFor="totalEquipmentCost">Total Equipment Points (ep)</label>
            <input
                type="number"
                id="totalEquipmentCost"
                onChange={handleInputChange}
                value={inputs.totalEquipmentCost || 0}
            />
            <div className="textarea">
                <label htmlFor={`equipmentInfo`}>Equipment Information (can include HTML)</label>
                <textarea
                    id={`equipmentInfo`}
                    onChange={handleInputChange}
                    value={inputs.equipmentInfo || ""}
                    placeholder={`<ul><li><strong>Commlink &middot;</strong> <span class="lesser-note">1 ep</span><li></ul>`}
                    rows="6"
                    cols="70"
                />
            </div>
            <div className="textarea">
                <label htmlFor={`languagesInfo`}>Languages (can include HTML)</label>
                <textarea
                    id={`languagesInfo`}
                    onChange={handleInputChange}
                    value={inputs.languagesInfo || ""}
                    placeholder={`<strong>&middot;</strong> native: <strong>English &middot;</strong>`}
                    rows="6"
                    cols="70"
                />
            </div>
        </section>
    );
}

export default NewAdvantages;