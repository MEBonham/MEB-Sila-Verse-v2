import React from 'reactn';
import DOMPurify from 'dompurify';

const ComplicationsSection = props => {
    const complications = props.hero.complications;
    const parse = require('html-react-parser');

    const trimmedArray = complications.map((item, i) => {
        if (item.name && item.desc && (item.name !== "") && (item.desc !== "") ) {
            return `<p class="complication" key=${i}><strong>${DOMPurify.sanitize(item.name)}:</strong> ${DOMPurify.sanitize(item.desc)}</p>`;
        } else if (item.name && item.name !== "") {
            return `<p class="complication" key=${i}><strong>${DOMPurify.sanitize(item.name)}</strong></p>`;
        } else if (item.desc && item.desc !== "") {
            return `<p class="complication" key=${i}>${DOMPurify.sanitize(item.desc)}</p>`;
        } else {
            return null;
        }
    })
    
    if (trimmedArray.length > 0) {
        return(
            <section className="complications">
                <h2><strong>Complications</strong></h2>
                { trimmedArray.map(item => ( parse(item) )) }
            </section>
        );
    } else {
        return null;
    }    
}

export default ComplicationsSection;