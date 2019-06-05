import React, { useContext } from 'reactn';

import NewMultiformContext from '../../hooks/NewMultiformContext';

const NewNotes = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);

    return(
        <section className="notes">
            <h2>Notes</h2>
            <div className="textarea">
                <label htmlFor={`notes`}>Notes (can include HTML)</label>
                <textarea
                    id={`notes`}
                    onChange={handleInputChange}
                    value={inputs.notes || ""}
                    placeholder=""
                    rows="8"
                    cols="70"
                />
            </div>
        </section>
    );
}

export default NewNotes;