import React, { useState, useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import addIcon from '../../images/add-icon.png';

import EditSinglePower from './EditSinglePower';

const EditPowers = () => {

    const uuidv1 = require('uuid/v1');

    const { inputs, setInputs, handleInputChange, powerInfo, powerCount, setPowerCount, totalPowersCost } = useContext(EditMultiformContext);
    const [ powerList, setPowerList ] = useState();
    const [ addPowerCooldown, setAddPowerCooldown ] = useState(false);

    const stateToInputsFlow = stateObject => {
        const inputsCopy = JSON.parse(JSON.stringify(inputs));
        inputsCopy.totalPowersCost = totalPowersCost;
        for (let i = 0; i < powerCount; i++) {
            Object.keys(stateObject[i]).forEach(key => {
                const str = `power-${i}-${key}`;
                inputsCopy[str] = stateObject[i][key];
            })
        }
        return inputsCopy;
    }

    const inputsToStateFlow = () => {
        const editedPowersCopy = [];
        for (let i = 0; i < powerCount; i++) {
            editedPowersCopy.push({});
            editedPowersCopy[i].name = inputs[`power-${i}-name`] || "";
            editedPowersCopy[i].device = inputs[`power-${i}-device`] || false;
            editedPowersCopy[i].cost = inputs[`power-${i}-cost`] || "";
            editedPowersCopy[i].desc = inputs[`power-${i}-desc`] || "";
            editedPowersCopy[i].details = inputs[`power-${i}-details`] || "";
        }
        return editedPowersCopy;
    }

    useEffect(() => {
        setPowerList(powerInfo.map((power, i) => (
            <EditSinglePower key={uuidv1()} powerNum={i} power={power} handleDeletePower={handleDeletePower} />
        )));
        setInputs(stateToInputsFlow(powerInfo));
    }, [ powerInfo ]);

    useEffect(() => {
        setInputs(stateToInputsFlow(powerInfo));
    }, [ powerInfo, totalPowersCost ])

    useEffect(() => {
        console.log(powerCount);
    }, [ powerCount ]);

    const handleAddPower = () => {
        if (!addPowerCooldown) {
            const powersCopy = inputsToStateFlow();
            powersCopy.push({});
            setPowerCount(powerCount + 1);
            setPowerList(powersCopy.map((power, i) => (
                <EditSinglePower key={uuidv1()} powerNum={i} power={power} handleDeletePower={handleDeletePower} />
            )));
            setInputs(stateToInputsFlow(powersCopy));
            setAddPowerCooldown(true);
            setTimeout(() => {
                setAddPowerCooldown(false);
            }, 2000);
        }
    }

    const handleDeletePower = ev => {
        console.log(powerCount);
        // const arrAroundIndex = ev.target.id.split("-");
        // const index = parseInt(arrAroundIndex[1]);
        // const powersCopy = inputsToStateFlow();
        // const tempCount = powerCount - 1;
        // setPowerCount(tempCount);
        // powersCopy.splice(index, 1);
        // setInputs(stateToInputsFlow(powersCopy));
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
            <div className={addPowerCooldown ? "add-power disabled" : "add-power"}>
                <img src={addIcon} alt="Add Power" onClick={handleAddPower} />
                <p>Add new power to hero</p>
            </div>
        </section>
    );
}

export default EditPowers;