import React, { useGlobal, getGlobal } from 'reactn';
import DOMPurify from 'dompurify';

const PowersSection = props => {
    const powers = props.hero.powers;

    const totalStr = props.hero.totalPowersCost;
    let total;
    if (!isNaN(totalStr)) {
        total = parseInt(totalStr);
    } else {
        total = totalStr;
    }
    const [ pptTotals, setPptTotals ] = useGlobal('pptTotals');
    if (pptTotals.powers !== total) {
        setPptTotals({
            ...getGlobal().pptTotals,
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
                            <h3><strong>{power.name}:</strong></h3><span> <strong>&middot;</strong> <span className="cost-note">{power.cost}</span></span>
                        </div>
                        <p className="lesser-note">{power.desc}</p>
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