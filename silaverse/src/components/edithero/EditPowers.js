import React, { useState, useEffect, useContext } from 'reactn';

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
        powerCount,
        setPowerCount,
        totalPowersCost
    } = useContext(EditMultiformContext);
    const [ powersToRender, setPowersToRender ] = useState();
    const [ addPowerCooldown, setAddPowerCooldown ] = useState(false);

    useEffect(() => {
        setPowerCount(powerInfo.length);
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
        setInputs({
            ...inputs,
            totalPowersCost: totalPowersCost
        });
    }, [ totalPowersCost ])

    useEffect(() => {
        console.log(powerCount);
    }, [ powerCount ]);

    const handleAddPower = () => {
        if (!addPowerCooldown) {
            const powersCopy = inputsToStateFlow(inputs, powerCount);
            powersCopy.push({});
            setPowerCount(powerCount + 1);
            setPowersToRender(powersCopy.map((power, i) => (
                <EditSinglePower
                    key={uuidv1()}
                    powerNum={i}
                    power={power}
                    handleDeletePower={handleDeletePower}
                />
            )));
            setInputs(stateToInputsFlow(powersCopy, inputs));
            setAddPowerCooldown(true);
            setTimeout(() => {
                setAddPowerCooldown(false);
            }, 2000);
        }
    }

    const handleDeletePower = ev => {
        console.log(powerCount);
        if (window.confirm("Are you sure you want to delete this power?")) {
            const arrAroundIndex = ev.target.id.split("-");
            const index = parseInt(arrAroundIndex[1]);
            const powersCopy = inputsToStateFlow(inputs, powerCount);
            setPowerCount(powerCount - 1);
            powersCopy.splice(index, 1);
            setPowersToRender(powersCopy.map((power, i) => (
                <EditSinglePower
                    key={uuidv1()}
                    powerNum={i}
                    power={power}
                    handleDeletePower={handleDeletePower}
                />
            )));
            setInputs(stateToInputsFlow(powersCopy, inputs));
        }
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
            {powersToRender}
            <div className={addPowerCooldown ? "add-power disabled" : "add-power"}>
                <img src={addIcon} alt="Add Power" onClick={handleAddPower} />
                <p>Add new power to hero</p>
            </div>
        </section>
    );
}

export default EditPowers;