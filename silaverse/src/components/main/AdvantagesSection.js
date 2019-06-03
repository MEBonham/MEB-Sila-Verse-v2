import React, { useGlobal, getGlobal } from 'reactn';
import DOMPurify from 'dompurify';

const AdvantagesSection = props => {

    const totalStr = props.hero.totalAdvantagesCost;
    let total;
    if (!isNaN(totalStr)) {
        total = parseInt(totalStr);
    } else {
        total = totalStr;
    }
    const [ pptTotals, setPptTotals ] = useGlobal('pptTotals');
    if (pptTotals.advantages !== total) {
        setPptTotals({
            ...getGlobal().pptTotals,
            advantages: total
        });
    }

    const parse = require('html-react-parser');
    const cleanedAdvantages = DOMPurify.sanitize(`<div class="advantages-list">${props.hero.advantagesList}</div>`);
    const cleanedEquipment = DOMPurify.sanitize(`<div>${props.hero.equipmentInfo}</div>`);
    const cleanedLanguages = DOMPurify.sanitize(`<div>${props.hero.languages}</div>`);
    
    const equipmentSection = (props.hero.equipmentInfo !== "") ?
        (<section className="equipment">
            <h3>Equipment [{props.hero.totalEquipmentCost} ep]</h3>
            {parse(cleanedEquipment)}
        </section>) :
        null;
    
    const languagesSection = (props.hero.languages !== "") ?
        (<section className="languages">
            <h3>Languages</h3>
            {parse(cleanedLanguages)}
        </section>) :
        null;

    return(
        <section className="advantages">
            <h2><strong>Advantages</strong> [{total} ppt]</h2>
            {parse(cleanedAdvantages)}
            {equipmentSection}
            {languagesSection}
        </section>
    );
}

export default AdvantagesSection;