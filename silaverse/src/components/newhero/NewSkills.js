import React, { useState, useEffect, useContext, useRef } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import addIcon from '../../images/add-icon.png';

import { inputsToStateFlowSkills, stateToInputsFlowSkills } from '../edithero/EditHelperFcts';
import NewSingleSkill from './NewSingleSkill';

const NewSkills = () => {

    const uuidv1 = require('uuid/v1');

    const { inputs, setInputs } = useContext(NewMultiformContext);
    const [ skillsToRender, setSkillsToRender ] = useState([]);
    
    const latestInputs = useRef({});
    useEffect(() => {
        latestInputs.current = inputs;
    }, [ inputs ]);

    // useEffect(() => {
    //     if (skillsInfo) {
    //         inputs.skillsCount = Object.keys(skillsInfo).length;
    //         setSkillsToRender(Object.keys(skillsInfo).sort().map((skillName, i) => (
    //             <EditSingleSkill
    //                 key={uuidv1()}
    //                 skillNum={i}
    //                 handleDeleteSkill={handleDeleteSkill}
    //             />
    //         )));
    //         setInputs(stateToInputsFlowSkills(skillsInfo, inputs));
    //     }
    // }, [ skillsInfo ]);

    useEffect(() => {
        setInputs(inputs => ({
            ...inputs,
            skillsCount: 0
        }));
    }, []);

    const handleAddSkill = () => {
        console.log(latestInputs.current);
        const skillsCopy = inputsToStateFlowSkills(latestInputs.current);
        setSkillsToRender([
            ...Object.keys(skillsCopy).sort().map((skillName, i) => (
                <NewSingleSkill
                    key={uuidv1()}
                    skillNum={i}
                    handleDeleteSkill={handleDeleteSkill}
                />
            )),
            <NewSingleSkill
                key={uuidv1()}
                skillNum={Object.keys(skillsCopy).length}
                handleDeleteSkill={handleDeleteSkill}
            />
        ])
        latestInputs.current.skillsCount += 1;
        setInputs(stateToInputsFlowSkills(skillsCopy, latestInputs.current));
    }
    
    const handleDeleteSkill = ev => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            const arrAroundIndex = ev.target.id.split("-");
            const index = parseInt(arrAroundIndex[1]);
            delete latestInputs.current[`skill-${index}-name`];
            delete latestInputs.current[`skill-${index}-ranks`];
            delete latestInputs.current[`skill-${index}-mod`];
            const skillsCopy = inputsToStateFlowSkills(latestInputs.current);
            latestInputs.current.skillsCount -= 1;
            setSkillsToRender(Object.keys(skillsCopy).map((skillName, i) => {
                return(<NewSingleSkill
                    key={uuidv1()}
                    skillNum={i}
                    handleDeleteSkill={handleDeleteSkill}
                />);
            }));
            setInputs(stateToInputsFlowSkills(skillsCopy, latestInputs.current));
        }
    }

    return(
        <section className="skills">
            <h2>Skills</h2>
            <div className="skills-envelope">
                {skillsToRender}
                <div className="one-skill add-skill" onClick={handleAddSkill}>
                    <img src={addIcon} alt="Add Skill" />
                    Add Skill
                </div>
            </div>
        </section>
    );
}

export default NewSkills;