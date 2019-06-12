import React, { useState, useEffect, useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import addIcon from '../../images/add-icon.png';
import goldStar from '../../images/gold-star.png';

import { inputsToStateFlowSkills, stateToInputsFlowSkills } from '../edithero/EditHelperFcts';
import NewSingleSkill from './NewSingleSkill';
import HTMLHelpContextMenu2 from './HTMLHelpContextMenu2';

const NewSkills = () => {

    const uuidv1 = require('uuid/v1');

    const { inputs, setInputs, handleInputChange } = useContext(NewMultiformContext);
    const [ skillsToRender, setSkillsToRender ] = useState([]);
    const textareaRef = useRef(null);
    
    const latestInputs = useRef({});
    useEffect(() => {
        latestInputs.current = inputs;
    }, [ inputs ]);

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
                        ref={textareaRef}
                    />
                    <MenuProvider id={`htmlHelp-altSkills`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu2 menuId={`htmlHelp-altSkills`} input={`altSkills`} refProp={textareaRef} />
                </div>
            </div>
        </section>
    );
}

export default NewSkills;