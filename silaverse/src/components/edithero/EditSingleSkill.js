import React, { useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import deleteIcon from '../../images/delete-icon.png';

const EditSingleSkill = props => {
    
    const { inputs, handleInputChange } = useContext(EditMultiformContext);

    if (props.skill) {
        return(
            <div className="one-skill">
                <img
                    src={deleteIcon}
                    alt="Delete Skill"
                    onClick={props.handleDeleteSkill}
                    className="delete-skill-button"
                    id={`skill-${props.skillNum}-delete`}
                    index={props.skillNum}
                />
                <div>
                    <label htmlFor={`skill-${props.skillNum}-name`}>Skill</label>
                    <input
                        className="skill-name"
                        type="text"
                        id={`skill-${props.skillNum}-name`}
                        onChange={handleInputChange}
                        value={inputs[`skill-${props.skillNum}-name`] || ""}
                        required
                    />
                    <div className="skill-ranks">
                        <label htmlFor={`skill-${props.skillNum}-ranks`}>Ranks</label>
                        <input
                            type="number"
                            id={`skill-${props.skillNum}-ranks`}
                            onChange={handleInputChange}
                            value={inputs[`skill-${props.skillNum}-ranks`] || 0}
                            required
                        />
                    </div>
                    <div className="skill-mod">
                        <label htmlFor={`skill-${props.skillNum}-mod`}>Modifier</label>
                        <input
                            type="text"
                            id={`skill-${props.skillNum}-mod`}
                            onChange={handleInputChange}
                            value={inputs[`skill-${props.skillNum}-mod`] || ""}
                            required
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default EditSingleSkill;