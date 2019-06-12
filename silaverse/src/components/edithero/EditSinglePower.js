import React, { useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';
import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu from './HTMLHelpContextMenu';

const EditSinglePower = props => {
    
    const { inputs, handleInputChange } = useContext(EditMultiformContext);
    const textareaRef = useRef(null);

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
                <div className="for-note">
                    <label htmlFor={`power-${props.powerNum}-note`}>Note</label>
                    <input
                        type="text"
                        id={`power-${props.powerNum}-note`}
                        onChange={handleInputChange}
                        placeholder="e.g. whole power is Subtle"
                        value={inputs[`power-${props.powerNum}-note`] || ""}
                    />
                </div>
                <div className="textarea">
                    <label htmlFor={`power-${props.powerNum}-details`}>Details (can include HTML)</label>
                    <div className="sub-textarea">
                        <textarea
                            id={`power-${props.powerNum}-details`}
                            onChange={handleInputChange}
                            value={inputs[`power-${props.powerNum}-details`] || ""}
                            placeholder="Damage 10"
                            required
                            rows="6"
                            cols="60"
                            ref={textareaRef}
                        />
                        <MenuProvider id={`htmlHelp-power-${props.powerNum}`}>
                            <img
                                src={goldStar}
                                alt="HTML-help Menu"
                                className="star-menu"
                            />
                        </MenuProvider>
                        <HTMLHelpContextMenu menuId={`htmlHelp-power-${props.powerNum}`} input={`power-${props.powerNum}-details`} refProp={textareaRef} />
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default EditSinglePower;