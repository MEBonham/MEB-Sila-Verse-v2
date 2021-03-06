import React, { useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

const EditSingleAbility = props => {

    const baseId = `base${props.abbr}`;
    const effId = `eff${props.abbr}`;
    
    const { inputs, handleInputChange } = useContext(EditMultiformContext);

    useEffect(() => {
        if (props.nums) {
            inputs[baseId] = props.nums.base;
            inputs[effId] = props.nums.eff;
        }
    }, [ props.nums ])

    if (props.nums) {
        return(
            <div className="ability-div">
                <label>{props.name}</label>
                <input
                    type="text"
                    id={baseId}
                    placeholder="Base"
                    onChange={handleInputChange}
                    value={inputs[baseId] || props.nums.base}
                    required
                />
                <input
                    type="text"
                    id={effId}
                    placeholder="Effective"
                    onChange={handleInputChange}
                    value={inputs[effId] || props.nums.eff}
                    required
                />
            </div>
        );
    } else {
        return null;
    }
}

export default EditSingleAbility;