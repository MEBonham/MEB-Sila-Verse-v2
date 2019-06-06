import React, { useState, useEffect, useContext, useRef } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import addIcon from '../../images/add-icon.png';

import { inputsToStateFlowComplications, stateToInputsFlowComplications } from './EditHelperFcts';
import EditSingleComplication from './EditSingleComplication';

const EditComplications = () => {

    const uuidv1 = require('uuid/v1');

    const {
        inputs,
        setInputs,
        complicationsInfo
    } = useContext(EditMultiformContext);
    const [ complicationsToRender, setComplicationsToRender ] = useState();

    const addComplicationCooldown = useRef(false);
    
    const latestInputs = useRef({});
    useEffect(() => {
        latestInputs.current = inputs;
    });

    useEffect(() => {
        if (complicationsInfo) {
            inputs.complicationsCount = complicationsInfo.length;
            setComplicationsToRender(complicationsInfo.map((complication, i) => (
                <EditSingleComplication
                    key={uuidv1()}
                    num={i}
                    handleDeleteComplication={handleDeleteComplication}
                />
            )));
            setInputs(stateToInputsFlowComplications(complicationsInfo, inputs));
        }
    }, [ complicationsInfo ]);

    const handleAddComplication = () => {
        if (!addComplicationCooldown.current) {
            const complicationsCopy = inputsToStateFlowComplications(latestInputs.current);
            complicationsCopy.push({});
            latestInputs.current.complicationsCount += 1;
            setComplicationsToRender(complicationsCopy.map((complication, i) => (
                <EditSingleComplication
                    key={uuidv1()}
                    num={i}
                    handleDeleteComplication={handleDeleteComplication}
                />
            )));
            setInputs(stateToInputsFlowComplications(complicationsCopy, latestInputs.current));
            addComplicationCooldown.current = true;
            setTimeout(() => {
                addComplicationCooldown.current = false;
            }, 1000);
        }
    }

    const handleDeleteComplication = ev => {
        if (window.confirm("Are you sure you want to delete this complication?")) {
            const arrAroundIndex = ev.target.id.split("-");
            const index = parseInt(arrAroundIndex[1]);
            const complicationsCopy = inputsToStateFlowComplications(latestInputs.current);
            latestInputs.current.complicationsCount -= 1;
            complicationsCopy.splice(index, 1);
            setComplicationsToRender(complicationsCopy.map((complication, i) => (
                <EditSingleComplication
                    key={uuidv1()}
                    num={i}
                    handleDeleteComplication={handleDeleteComplication}
                />
            )));
            setInputs(stateToInputsFlowComplications(complicationsCopy, latestInputs.current));
        }
    }

    return(
        <section className="complications">
            <h2 id="complications-section">Complications</h2>
            {complicationsToRender}
            <div className={addComplicationCooldown.current ? "add-complication disabled" : "add-complication"}>
                <img src={addIcon} alt="Add Complication" onClick={handleAddComplication} />
                <p>Add new complication to hero</p>
            </div>
        </section>
    );
}

export default EditComplications;