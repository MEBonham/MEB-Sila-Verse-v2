import React, { useContext } from 'reactn';
import DOMPurify from 'dompurify';

import PptTotalsContext from '../../hooks/PptTotalsContext';

const AdvantagesSection = props => {

    const totalStr = props.hero.totalAdvantagesCost;
    let total;
    if (!isNaN(totalStr)) {
        total = parseInt(totalStr);
    } else {
        total = totalStr;
    }
    const { pptTotals, setPptTotals } = useContext(PptTotalsContext);
    if (pptTotals.advantages !== total) {
        setPptTotals({
            ...pptTotals,
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

    if (props.hero.advantagesList !== "" || props.hero.equipmentInfo !== "" || props.hero.languages !== "") {
        return(
            <section className="advantages">
                <h2><strong>Advantages</strong> [{total} ppt]</h2>
                {parse(cleanedAdvantages)}
                {equipmentSection}
                {languagesSection}
            </section>
        );
    } else {
        return null;
    }
}

export default AdvantagesSection;