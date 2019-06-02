import React, { useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import deleteIcon from '../../images/delete-icon.png';

const NewSinglePower = props => {
    
    const { inputs, handleInputChange } = useContext(NewMultiformContext);

    if (props.power) {
        return(
            <div className="power-div">
                <div className="buttons">
                    <img
                        src={deleteIcon}
                        alt="Delete Power"
                        onClick={props.handleDeletePower}
                        className="delete-power-button"
                        id={`power-${props.powerNum}-delete`}
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
                <div className="for-name">
                    <label htmlFor={`power-${props.powerNum}-name`}>Name</label>
                    <input
                        type="text"
                        id={`power-${props.powerNum}-name`}
                        onChange={handleInputChange}
                        value={inputs[`power-${props.powerNum}-name`] || ""}
                        required
                    />
                </div>
                <div className="for-cost">
                    <label htmlFor={`power-${props.powerNum}-cost`}>Power Point Cost</label>
                    <input
                        type="text"
                        id={`power-${props.powerNum}-cost`}
                        onChange={handleInputChange}
                        value={inputs[`power-${props.powerNum}-cost`] || ""}
                        required
                    />
                </div>
                <div className="for-desc">
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
                        rows="6"
                        cols="60"
                    />
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default NewSinglePower;