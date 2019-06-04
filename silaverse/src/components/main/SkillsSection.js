import React, { useState, useEffect, useGlobal, getGlobal } from 'reactn';
import DOMPurify from 'dompurify';

const SkillsSection = props => {
    const parse = require('html-react-parser');

    const skills = props.hero.skills;
    const [ skillsList, setSkillsList ] = useState([]);

    const [ totalRanks, setTotalRanks ] = useState(0);
    const [ display, setDisplay ] = useState(<p></p>)
    const [ altDisplay, setAltDisplay ] = useState(<p></p>)
    const [ pptTotals, setPptTotals ] = useGlobal('pptTotals');
    useEffect(() => {
        if (skills) {
            setSkillsList(Object.keys(skills).sort())
        }
        const divVar = `<div class="alt-skills">${props.hero.altSkills}</div>`;
        setAltDisplay((props.hero && props.hero.altSkills !== "") ?
            parse(DOMPurify.sanitize(divVar)) :
            null
        );
    }, [ props.hero ]);

    useEffect(() => {
        let totalVar = 0;
        skillsList.forEach(skillName => {
            totalVar += parseInt(skills[skillName].ranks);
        })
        setTotalRanks(totalVar);

        setDisplay(`<p><strong>&middot; ${skillsList.map(skillName => (
            `${skillName}</strong> ${skills[skillName].ranks} <strong>(${skills[skillName].mod})`
        )).join(" &middot; ")} &middot;</strong></p>`);
    }, [ skillsList ]);

    useEffect(() => {
        if (Math.ceil(totalRanks / 2) !== pptTotals.skills) {
            setPptTotals({
                ...getGlobal().pptTotals,
                skills: Math.ceil(totalRanks / 2)
            });
        }
    }, [ totalRanks ]);

    if (skillsList.length) {
        return(
            <section className="skills">
                <h2><strong>Skills</strong> [{Math.ceil(totalRanks / 2)} ppt]</h2>
                {parse(DOMPurify.sanitize(display))}
                {altDisplay}
            </section>
        );
    } else {
        return null;
    }
}

export default SkillsSection;