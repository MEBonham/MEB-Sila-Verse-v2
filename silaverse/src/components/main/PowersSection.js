import React, { useContext } from 'reactn';
import DOMPurify from 'dompurify';

import PptTotalsContext from '../../hooks/PptTotalsContext';

const PowersSection = props => {
    const powers = props.hero.powers;

    const totalStr = props.hero.totalPowersCost;
    let total;
    if (!isNaN(totalStr)) {
        total = parseInt(totalStr);
    } else {
        total = totalStr;
    }
    const { pptTotals, setPptTotals } = useContext(PptTotalsContext);
    if (pptTotals.powers !== total) {
        setPptTotals({
            ...pptTotals,
            powers: total
        });
    }

    const parse = require('html-react-parser');
    const detailsArray = [];
    for (let i = 0; i < powers.length; i++) {
        const cleaned = DOMPurify.sanitize(`<div class="power-details">${powers[i].details}</div>`);
        detailsArray.push(parse(cleaned));
    }

    if (powers.length) {
        return(
            <section>
                <h2><strong>Powers</strong> [{total} ppt]</h2>
                {powers.map((power, i) => (
                    <section className={powers[i].device ? "power-display device-shadow" : "power-display"} key={i}>
                        <div className="power-heading">
                            <h3><strong>{power.name}:</strong></h3><span> <strong>&middot;</strong> <span className="cost-note">
                                {power.cost}</span></span>
                        </div>
                        <div><span className="lesser-note">{power.desc}</span>{power.note ?
                            (<div className="power-note">{parse(DOMPurify.sanitize(power.note))}</div>) :
                            null}</div>
                        {detailsArray[i]}
                    </section>
                ))}
            </section>
        );
    } else {
        return null;
    }
}

export default PowersSection;