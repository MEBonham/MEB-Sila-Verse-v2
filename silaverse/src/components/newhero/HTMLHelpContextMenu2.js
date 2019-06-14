import React, { useContext } from 'reactn';
import { Menu, Item, Separator, Submenu } from 'react-contexify';

import NewMultiformContext from '../../hooks/NewMultiformContext';

const HTMLHelpContextMenu2 = props => {
    
    const { inputs, setInputs } = useContext(NewMultiformContext);
    
    const onClick = ({ event, props }) => {
        switch (props.type) {
            case "insert":
                const inputsCopy = JSON.parse(JSON.stringify(inputs));
                if (inputsCopy[props.input] === undefined) {
                    inputsCopy[props.input] = "";
                }
                inputsCopy[props.input] += props.payload;
                setInputs(inputsCopy);
                break;
            case "copy":
                // navigator.clipboard.writeText(event.target.href)
                navigator.clipboard.writeText(props.payload)
                    .then(() => {
                        props.refProp.current.focus();
                    })
                    .catch(err => {
                        console.log("Unable to copy to clipboard;", err);
                    });
                break;
            default:
                console.log("Unrecognized Menu Option");
        }
    }

    return(
        <Menu id={props.menuId}>
            <Submenu label="Insert Into Textarea" arrow="&#9656;">
                <Item onClick={onClick} data={{
                    type: "insert",
                    input: props.input,
                    payload: `<p><strong></strong> () <strong>&middot;</strong> <span class="lesser-note"> ppt</span><br />\n</p>`
                }}>
                    Paragraph Beginning
                </Item>
                <Item onClick={onClick} data={{
                    type: "insert",
                    input: props.input,
                    payload: `<ul>\n<li><strong></strong> () <strong>&middot;</strong> <span class="lesser-note"> ep</span><br />\n</li>\n</ul>`
                }}>
                    List Beginning
                </Item>
                <Item onClick={onClick} data={{ type: "insert", input: props.input, payload: `<strong></strong>` }}>
                    Bold Tag
                </Item>
                <Item onClick={onClick} data={{ type: "insert", input: props.input, payload: `<strong>&middot;</strong>` }}>
                    Bold Middot
                </Item>
                <Item onClick={onClick} data={{
                    type: "insert",
                    input: props.input,
                    payload: `<p class="alt"><span class="h3-style">ALT - :</span> <strong>&middot;</strong> <span class="cost-note"> ppt</span><br />\n<span class="lesser-note"> Power</span></p>`
                }}>
                    ALT Power Beginning
                </Item>
                <Item onClick={onClick} data={{
                    type: "insert",
                    input: props.input,
                    payload: `<ul>\n<li><strong>:</strong> + <strong>&middot;</strong> Damage DC 15 (Strength-based), bludgeoning <strong>&middot;</strong> .<br />\n</li>\n</ul>`
                }}>
                    Attack Beginning
                </Item>
            </Submenu>
            <Separator />
            <Submenu label="Copy to Clipboard" arrow="&#9656;">
                <Item onClick={onClick} data={{ type: "copy", payload: `<span class="lesser-note"></span>`, refProp: props.refProp }}>Lesser Note Span</Item>
                <Item onClick={onClick} data={{ type: "copy", payload: ` &middot; `, refProp: props.refProp }}>Spaced Out Middot</Item>
                <Item onClick={onClick} data={{ type: "copy", payload: `<span class=""></span>`, refProp: props.refProp }}>Generic span-Tag</Item>
            </Submenu>
        </Menu>
    );
}

export default HTMLHelpContextMenu2;