import React, { useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';

const EditSingleComplication = props => {
    
    const { inputs, handleInputChange } = useContext(EditMultiformContext);

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
                    <textarea
                        id={`complication-${props.num}-desc`}
                        onChange={handleInputChange}
                        value={inputs[`complication-${props.num}-desc`] || ""}
                        rows="4"
                        cols="50"
                    />
                </div>
            </div>
        </div>
    );
}

export default EditSingleComplication;