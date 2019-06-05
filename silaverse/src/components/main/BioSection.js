import React from 'reactn';
import DOMPurify from 'dompurify';

const BioSection = props => {
    const bio = props.hero.bio;
    const parse = require('html-react-parser');

    if (bio && bio !== "") {
        return(
            <section className="bio">
                <h2><strong>Bio</strong></h2>
                { parse(DOMPurify.sanitize(`<div class="bio-text">${bio}</div>`)) }
            </section>
        );
    } else {
        return null;
    }    
}

export default BioSection;