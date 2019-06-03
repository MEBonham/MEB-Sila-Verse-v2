import React, { useState, useEffect, useContext, useRef } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import addIcon from '../../images/add-icon.png';

import { inputsToStateFlowSkills, stateToInputsFlowSkills } from './EditHelperFcts';
import EditSingleSkill from './EditSingleSkill';

const EditSkills = () => {

    const uuidv1 = require('uuid/v1');

    const { inputs, setInputs, skillsInfo } = useContext(EditMultiformContext);
    const [ skillsToRender, setSkillsToRender ] = useState([]);
    
    const latestInputs = useRef({});
    useEffect(() => {
        latestInputs.current = inputs;
    }, [ inputs ]);

    useEffect(() => {
        if (skillsInfo) {
            inputs.skillsCount = Object.keys(skillsInfo).length;
            setSkillsToRender(Object.keys(skillsInfo).sort().map((skillName, i) => (
                <EditSingleSkill
                    key={uuidv1()}
                    skillNum={i}
                    skill={skillsInfo[skillName]}
                    // handleDeleteSkill={handleDeleteSkill}
                />
            )));
            setInputs(stateToInputsFlowSkills(skillsInfo, inputs));
        }
    }, [ skillsInfo ]);

    const handleAddSkill = () => {
        const skillsCopy = inputsToStateFlowSkills(latestInputs.current);
        setSkillsToRender([
            ...Object.keys(skillsCopy).sort().map((skillName, i) => (
                <EditSingleSkill
                    key={uuidv1()}
                    skillNum={i}
                    skill={skillsCopy[skillName]}
                    // handleDeleteSkill={handleDeleteSkill}
                />
            )),
            <EditSingleSkill
                key={uuidv1()}
                skillNum={Object.keys(skillsCopy).length}
                skill={{ name: { ranks: 0, mod: "" }}}
                // handleDeleteSkill={handleDeleteSkill}
            />
        ])
        latestInputs.current.skillsCount += 1;
        setInputs(stateToInputsFlowSkills(skillsCopy, latestInputs.current));
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

export default EditSkills;