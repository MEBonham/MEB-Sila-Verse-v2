import React, { useState } from 'reactn';

import AccordionSection from './AccordionSection';

const Accordion = props => {

    const [ openSections, setOpenSections ] = useState({});

    props.children.forEach(child => {
        if (child.props.isOpen) {
            setOpenSections(openSections => ({
                ...openSections,
                [child.props.label]: true
            }));
        }
    });

    const onClick = label => {
        const isOpen = !!openSections[label];
        if (props.allowMultipleOpen) {
            setOpenSections(openSections => ({
                ...openSections,
                [label]: !isOpen
            }));
        } else {
            setOpenSections({
                [label]: !isOpen
            });
        }
    }

    return (
        <div className="accordion">
            {props.children.map(child => (
                <AccordionSection
                    key={child.props.label}
                    isOpen={!!openSections[child.props.label]}
                    label={child.props.label}
                    onClick={onClick}
                >
                    {child.props.children}   
                </AccordionSection>
            ))}
        </div>
    );
}

export default Accordion;