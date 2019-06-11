import React, { useState, useEffect, useContext, useRef } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import addIcon from '../../images/add-icon.png';

import { inputsToStateFlowComplications, stateToInputsFlowComplications } from '../edithero/EditHelperFcts';
import NewSingleComplication from './NewSingleComplication';

const NewComplications = () => {

    const uuidv1 = require('uuid/v1');

    const {
        inputs,
        setInputs,
    } = useContext(NewMultiformContext);
    const [ complicationsToRender, setComplicationsToRender ] = useState();

    const addComplicationCooldown = useRef(false);
    
    const latestInputs = useRef({});
    useEffect(() => {
        latestInputs.current = inputs;
    });

    useEffect(() => {
        inputs.complicationsCount = 0;
    }, []);

    const handleAddComplication = () => {
        if (latestInputs.current.complicationsCount === undefined) {     // Hacky; shouldn't be needed, but is.
            latestInputs.current.complicationsCount = 0;
        }
        if (!addComplicationCooldown.current) {
            const complicationsCopy = inputsToStateFlowComplications(latestInputs.current);
            complicationsCopy.push({});
            console.log(latestInputs.current.complicationsCount);
            latestInputs.current.complicationsCount += 1;
            setComplicationsToRender(complicationsCopy.map((complication, i) => (
                <NewSingleComplication
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
                <NewSingleComplication
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
            <h2>Complications</h2>
            {complicationsToRender}
            <div className={addComplicationCooldown.current ? "add-complication disabled" : "add-complication"}>
                <img src={addIcon} alt="Add Complication" onClick={handleAddComplication} />
                <p>Add new complication to hero</p>
            </div>
        </section>
    );
}

export default NewComplications;