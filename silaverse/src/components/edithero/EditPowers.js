import React, { useState, useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import addIcon from '../../images/add-icon.png';

import EditSinglePower from './EditSinglePower';

const EditPowers = () => {

    const uuidv1 = require('uuid/v1');

    const { inputs, handleInputChange, powersInfo, powerCount, setPowerCount } = useContext(EditMultiformContext);
    const [ editedPowers, setEditedPowers ] = useState(powersInfo || []);
    const [ powerList, setPowerList ] = useState();

    // if (powersInfo) {
    //     powerCount = powersInfo.length;
    // } else {
    //     powerCount = 0;
    // }
    // const [ refreshFlag, setRefreshFlag ] = useState(0);

    useEffect(() => {
        setPowerList(editedPowers.map((power, i) => (
            <EditSinglePower key={uuidv1()} powerNum={i} power={power} handleDeletePower={handleDeletePower} />
        )));
    }, [ powerCount ]);

    const handleAddPower = () => {
        setEditedPowers([
            ...editedPowers,
            {}
        ]);
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