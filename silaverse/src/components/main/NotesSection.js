import React from 'reactn';
import DOMPurify from 'dompurify';

const NotesSection = props => {
    const notes = props.hero.notes;
    const parse = require('html-react-parser');

    if (notes && notes !== "") {
        return(
            <section className="notes">
                <h2><strong>Notes</strong></h2>
                <div>{ parse(DOMPurify.sanitize(notes)) }</div>
            </section>
        );
    } else {
        return null;
    }    
}

export default NotesSection;