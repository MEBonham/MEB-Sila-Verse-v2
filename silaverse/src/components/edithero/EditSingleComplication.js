import React, { useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';
import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu from './HTMLHelpContextMenu';

const EditSingleComplication = props => {
    
    const { inputs, handleInputChange } = useContext(EditMultiformContext);
    const textareaRef = useRef(null);

    return(
        <div className="complication">
            <div className="buttons">
                <img
                    src={deleteIcon}
                    alt="Delete Complication"
                    onClick={props.handleDeleteComplication}
                    id={`complication-${props.num}-delete`}
                    index={props.num}
                />
            </div>
            <div>
                <div className="for-name">
                    <label htmlFor={`complication-${props.num}-name`}>Name</label>
                    <input
                        type="text"
                        id={`complication-${props.num}-name`}
                        onChange={handleInputChange}
                        value={inputs[`complication-${props.num}-name`] || ""}
                    />
                </div>
                <div className="textarea">
                    <label htmlFor={`complication-${props.num}-desc`}>Description (can include HTML)</label>
                    <div className="sub-textarea">
                        <textarea
                            id={`complication-${props.num}-desc`}
                            onChange={handleInputChange}
                            value={inputs[`complication-${props.num}-desc`] || ""}
                            rows="4"
                            cols="50"
                            ref={textareaRef}
                        />
                        <MenuProvider id={`htmlHelp-complication-${props.num}`}>
                            <img
                                src={goldStar}
                                alt="HTML-help Menu"
                                className="star-menu"
                            />
                        </MenuProvider>
                        <HTMLHelpContextMenu menuId={`htmlHelp-complication-${props.num}`} input={`complication-${props.num}-desc`} refProp={textareaRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditSingleComplication;