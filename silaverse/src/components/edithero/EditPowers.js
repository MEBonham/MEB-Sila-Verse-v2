import React, { useState, useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import addIcon from '../../images/add-icon.png';

import EditSinglePower from './EditSinglePower';

const EditPowers = () => {

    const uuidv1 = require('uuid/v1');

    const { inputs, setInputs, handleInputChange, powerInfo, powerCount, setPowerCount, totalPowersCost } = useContext(EditMultiformContext);
    const [ editedPowers, setEditedPowers ] = useState(powerInfo || []);
    const [ powerList, setPowerList ] = useState();

    const stateToInputsFlow = () => {
        const inputsCopy = JSON.parse(JSON.stringify(inputs));
        inputsCopy.totalPowersCost = totalPowersCost;
        for (let i = 0; i < powerCount; i++) {
            Object.keys(editedPowers[i]).forEach(key => {
                const str = `power-${i}-${key}`;
                inputsCopy[str] = editedPowers[i][key];
            });
        }
        setInputs({
            ...inputs,
            ...inputsCopy
        });
    }

    useEffect(() => {
        if (Array.isArray(editedPowers)) {
            setPowerList(editedPowers.map((power, i) => (
                <EditSinglePower key={uuidv1()} powerNum={i} power={power} handleDeletePower={handleDeletePower} />
            )));
        }
    }, [ powerCount ]);

    useEffect(() => {
        setEditedPowers(powerInfo);
        stateToInputsFlow();
    }, [ powerInfo, totalPowersCost ])

    const handleAddPower = () => {
        if (Array.isArray(editedPowers)) {
            setEditedPowers([
                ...editedPowers,
                {}
            ]);
        }
        setPowerCount(powerCount + 1);
    }

    const handleDeletePower = ev => {
        const powersCopy = editedPowers;
        powersCopy.splice(ev.target.index, 1);
        setEditedPowers(powersCopy);
        setPowerCount(powerCount - 1);
    }

    return(
        <section className="powers">
            <h2>Powers ({powerCount})</h2>
            <label htmlFor="totalPowersCost">Total Cost of Powers</label>
            <input
                type="number"
                id="totalPowersCost"
                onChange={handleInputChange}
                value={inputs.totalPowersCost || 0}
            />
            {powerList}
            <div className="add-power">
                <img src={addIcon} alt="Add Power" onClick={handleAddPower} />
                <p>Add new power to hero</p>
            </div>
        </section>
    );
}

export default EditPowers;