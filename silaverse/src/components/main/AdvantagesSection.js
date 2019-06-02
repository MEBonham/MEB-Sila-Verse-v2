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
    const cleaned = DOMPurify.sanitize(`<div class="advantages-list">${props.hero.advantagesList}</div>`);

    return(
        <section>
            <h2><strong>Advantages</strong> [{total} ppt]</h2>
            {parse(cleaned)}
        </section>
    );
}

export default AdvantagesSection;