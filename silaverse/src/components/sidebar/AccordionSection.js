import React from 'reactn';

const AccordionSection = props => {

    const onClick = () => {
        props.onClick(props.label);
    }

    return(
        <section className="accordion-section">
            <div className="folder" onClick={onClick}>
                <span>{props.label}</span>
                {props.isOpen ? <span className="arrow">&#9650;</span> : <span className="arrow">&#9660;</span>}
            </div>
            {props.isOpen ?
                <div className="collapsible">
                    {props.children}
                </div> :
                null}
        </section>
    );
}

export default AccordionSection;