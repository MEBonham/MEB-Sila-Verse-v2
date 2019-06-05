import React, { useState, useEffect, useContext } from 'reactn';
import DOMPurify from 'dompurify';

import PptTotalsContext from '../../hooks/PptTotalsContext';

const SkillsSection = props => {
    const parse = require('html-react-parser');

    const skills = props.hero.skills;
    const [ skillsList, setSkillsList ] = useState([]);

    const [ totalRanks, setTotalRanks ] = useState(0);
    const [ display, setDisplay ] = useState(<p></p>)
    const [ altDisplay, setAltDisplay ] = useState(<p></p>)
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

    const { pptTotals, setPptTotals } = useContext(PptTotalsContext);
    if (pptTotals.skills !== Math.ceil(totalRanks / 2)) {
        setPptTotals({
            ...pptTotals,
            skills: Math.ceil(totalRanks / 2)
        });
    }

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