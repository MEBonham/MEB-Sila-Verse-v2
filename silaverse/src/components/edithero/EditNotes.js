import React, { useEffect, useContext } from 'reactn';

import EditMultiformContext from '../../hooks/EditMultiformContext';

const EditNotes = () => {

    const { inputs, setInputs, handleInputChange, notesInfo } = useContext(EditMultiformContext);

    useEffect(() => {
        if (notesInfo) {
            setInputs(inputs => ({
                ...inputs,
                notes: notesInfo
            }));
        }
    }, [ notesInfo ]);

    return(
        <section className="notes">
            <h2 id="notes-section">Notes</h2>
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

export default EditNotes;