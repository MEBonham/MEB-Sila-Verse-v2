import React, { useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';

const EditSinglePower = props => {
    
    const { inputs, handleInputChange } = useContext(EditMultiformContext);

    if (props.power) {
        return(
            <div className="power-div">
                <div className="buttons">
                    <img
                        src={deleteIcon}
                        alt="Delete Power"
                        onClick={props.handleDeletePower}
                        className="delete-power-button"
                        index={props.powerNum}
                    />
                </div>
                <div className="checkbox">
                    <label htmlFor={`power-${props.powerNum}-device`}>Device?</label>
                    <input
                        type="checkbox"
                        id={`power-${props.powerNum}-device`}
                        onChange={handleInputChange}
                        checked={inputs[`power-${props.powerNum}-device`] || false}
                    />
                </div>
                <div>
                    <label htmlFor={`power-${props.powerNum}-name`}>Name</label>
                    <input
                        type="text"
                        id={`power-${props.powerNum}-name`}
                        onChange={handleInputChange}
                        value={inputs[`power-${props.powerNum}-name`] || ""}
                        required
                    />
                </div>
                <div>
                    <label htmlFor={`power-${props.powerNum}-cost`}>Power Point Cost</label>
                    <input
                        type="text"
                        id={`power-${props.powerNum}-cost`}
                        onChange={handleInputChange}
                        value={inputs[`power-${props.powerNum}-cost`] || ""}
                        required
                    />
                </div>
                <div>
                    <label htmlFor={`power-${props.powerNum}-desc`}>Descriptors</label>
                    <input
                        type="text"
                        id={`power-${props.powerNum}-desc`}
                        onChange={handleInputChange}
                        value={inputs[`power-${props.powerNum}-desc`] || ""}
                        required
                    />
                </div>
                <div className="textarea">
                    <label htmlFor={`power-${props.powerNum}-details`}>Details (can include HTML)</label>
                    <textarea
                        id={`power-${props.powerNum}-details`}
                        onChange={handleInputChange}
                        value={inputs[`power-${props.powerNum}-details`] || ""}
                        placeholder="Damage 10"
                        required
                        rows="4"
                        cols="70"
                    />
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default EditSinglePower;