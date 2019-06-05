import React from 'reactn';
import DOMPurify from 'dompurify';

const OffenseSection = props => {
    const offense = props.hero.offense;

    const parse = require('html-react-parser');
    const cleaned = DOMPurify.sanitize(`<div class="attacks-list">${offense.attacksList}</div>`);

    return(
        <section className="offense">
            <h2><strong>Offense</strong></h2>
            <p><strong>Initiative: {offense.initiative}</strong></p>
            { (offense.attacksList !== "") ? (parse(cleaned)) : null }
        </section>
    );
}

export default OffenseSection;