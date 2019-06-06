import React, { useState, useEffect, useContext, useRef } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import addIcon from '../../images/add-icon.png';

import { inputsToStateFlow, stateToInputsFlow } from './EditHelperFcts';
import EditSinglePower from './EditSinglePower';

const EditPowers = () => {

    const uuidv1 = require('uuid/v1');

    const {
        inputs,
        setInputs,
        handleInputChange,
        powerInfo,
        totalPowersCost
    } = useContext(EditMultiformContext);
    const [ powersToRender, setPowersToRender ] = useState();

    const addPowerCooldown = useRef(false);
    
    const latestInputs = useRef({});
    useEffect(() => {
        latestInputs.current = inputs;
    });

    useEffect(() => {
        inputs.powerCount = powerInfo.length;
        setPowersToRender(powerInfo.map((power, i) => (
            <EditSinglePower
                key={uuidv1()}
                powerNum={i}
                power={power}
                handleDeletePower={handleDeletePower}
            />
        )));
        setInputs(stateToInputsFlow(powerInfo, inputs));
    }, [ powerInfo ]);

    useEffect(() => {
        setInputs(inputs => ({
            ...inputs,
            totalPowersCost: totalPowersCost
        }));
    }, [ totalPowersCost ])

    const handleAddPower = () => {
        if (!addPowerCooldown.current) {
            const powersCopy = inputsToStateFlow(latestInputs.current);
            powersCopy.push({});
            latestInputs.current.powerCount += 1;
            setPowersToRender(powersCopy.map((power, i) => (
                <EditSinglePower
                    key={uuidv1()}
                    powerNum={i}
                    power={power}
                    handleDeletePower={handleDeletePower}
                />
            )));
            setInputs(stateToInputsFlow(powersCopy, latestInputs.current));
            addPowerCooldown.current = true;
            setTimeout(() => {
                addPowerCooldown.current = false;
            }, 1000);
        }
    }

    const handleDeletePower = ev => {
        if (window.confirm("Are you sure you want to delete this power?")) {
            const arrAroundIndex = ev.target.id.split("-");
            const index = parseInt(arrAroundIndex[1]);
            const powersCopy = inputsToStateFlow(latestInputs.current);
            latestInputs.current.powerCount -= 1;
            powersCopy.splice(index, 1);
            setPowersToRender(powersCopy.map((power, i) => (
                <EditSinglePower
                    key={uuidv1()}
                    powerNum={i}
                    power={power}
                    handleDeletePower={handleDeletePower}
                />
            )));
            setInputs(stateToInputsFlow(powersCopy, latestInputs.current));
        }
    }

    return(
        <section className="powers">
            <h2 id="powers-section">Powers ({latestInputs.current.powerCount})</h2>
            <label htmlFor="totalPowersCost">Total Cost of Powers</label>
            <input
                type="number"
                id="totalPowersCost"
                onChange={handleInputChange}
                value={inputs.totalPowersCost || 0}
            />
            {powersToRender}
            <div className={addPowerCooldown.current ? "add-power disabled" : "add-power"}>
                <img src={addIcon} alt="Add Power" onClick={handleAddPower} />
                <p>Add new power to hero</p>
            </div>
        </section>
    );
}

export default EditPowers;