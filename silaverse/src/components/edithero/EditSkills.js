import React, { useState, useEffect, useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import addIcon from '../../images/add-icon.png';
import goldStar from '../../images/gold-star.png';

import { inputsToStateFlowSkills, stateToInputsFlowSkills } from './EditHelperFcts';
import EditSingleSkill from './EditSingleSkill';
import HTMLHelpContextMenu from './HTMLHelpContextMenu';

const EditSkills = () => {

    const uuidv1 = require('uuid/v1');

    const { inputs, setInputs, handleInputChange, skillsInfo } = useContext(EditMultiformContext);
    const [ skillsToRender, setSkillsToRender ] = useState([]);
    
    const latestInputs = useRef({});
    useEffect(() => {
        latestInputs.current = inputs;
    }, [ inputs ]);

    useEffect(() => {
        if (skillsInfo) {
            inputs.skillsCount = Object.keys(skillsInfo).length;
            setSkillsToRender(Object.keys(skillsInfo).sort().map((skillName, i) => {
                if (skillName === "altSkills") {
                    inputs.altSkills = skillsInfo[skillName];
                    return null;
                } else {
                    return(<EditSingleSkill
                        key={uuidv1()}
                        skillNum={i}
                        handleDeleteSkill={handleDeleteSkill}
                    />);
                }
            }));
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
                    handleDeleteSkill={handleDeleteSkill}
                />
            )),
            <EditSingleSkill
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
                return(<EditSingleSkill
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
            <h2 id="skills-section">Skills</h2>
            <div className="skills-envelope">
                {skillsToRender}
                <div className="one-skill add-skill" onClick={handleAddSkill}>
                    <img src={addIcon} alt="Add Skill" />
                    Add Skill
                </div>
            </div>
            <div className="textarea">
                <label htmlFor={`altSkills`}>Alternate Skills (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`altSkills`}
                        onChange={handleInputChange}
                        value={inputs.altSkills || ""}
                        placeholder=""
                        rows="4"
                        cols="70"
                    />
                    <MenuProvider id={`htmlHelp-altSkills`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu menuId={`htmlHelp-altSkills`} input={`altSkills`} />
                </div>
            </div>
        </section>
    );
}

export default EditSkills;