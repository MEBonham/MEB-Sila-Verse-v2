import React, { useState, useEffect, useContext } from 'reactn';
import DOMPurify from 'dompurify';

import PptTotalsContext from '../../hooks/PptTotalsContext';

const DefensesSection = props => {
    const defenses = props.hero.defenses;

    const [ total, setTotal ] = useState(0);
    const [ showDefRoll, setShowDefRoll ] = useState(false);
    const { pptTotals, setPptTotals } = useContext(PptTotalsContext);
    useEffect(() => {
        let totalVar = 0;
        Object.keys(defenses).filter(defenseName => (defenseName !== "toughness" && defenseName !== "altDefenses")).forEach(defenseName => {
            totalVar += parseInt(defenses[defenseName].base);
        });
        setTotal(totalVar);

        let toughnessNumberTry;
        if (defenses.toughness.eff[0] === "+") {
            toughnessNumberTry = defenses.toughness.eff.slice(1);
        } else {
            toughnessNumberTry = defenses.toughness.eff;
        }
        if (!isNaN(toughnessNumberTry) && defenses.toughness.defRoll > 0) {
            let effToughnessWithoutDefRoll = parseInt(toughnessNumberTry) - defenses.toughness.defRoll;
            if (effToughnessWithoutDefRoll >= 0) {
                setShowDefRoll(`/+${effToughnessWithoutDefRoll}*`);
            } else {
                setShowDefRoll(`/${effToughnessWithoutDefRoll}*`);
            }
        }
    }, [ props.hero ]);

    if (pptTotals.defenses !== total) {
        setPptTotals({
            ...pptTotals,
            defenses: total
        });
    }

    const parse = require('html-react-parser');
    const cleaned = DOMPurify.sanitize(`<div class="alt-defenses">${defenses.altDefenses}</div>`);

    return(
        <section>
            <h2><strong>Defenses</strong> [{total} ppt]</h2>
            <p><strong>&middot; Dodge</strong> {defenses.dodge.base} <strong>({defenses.dodge.eff}) &middot; Parry
                </strong> {defenses.parry.base} <strong>({defenses.parry.eff}) &middot;</strong></p>
            <p><strong>&middot; Fortitude</strong> {defenses.fortitude.base} <strong>({defenses.fortitude.eff}) &middot; Toughness
                ({defenses.toughness.eff}{showDefRoll ? showDefRoll : null}) &middot; Will
                </strong> {defenses.will.base} <strong>({defenses.will.eff}) &middot;</strong></p>
            {showDefRoll ?
                <p>* <span className="lesser-note">without Defensive Roll</span></p> :
                null}
            { defenses.altDefenses ? (parse(cleaned)) : null }
        </section>
    );
}

export default DefensesSection;