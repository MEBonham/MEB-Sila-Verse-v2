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
                    .then()
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
                <Item onClick={onClick} data={{ type: "insert", input: props.input, payload: `<strong></strong>` }}>
                    Bold Tag
                </Item>
                <Item onClick={onClick} data={{ type: "insert", input: props.input, payload: `<strong>&middot;</strong>` }}>
                    Bold Middot
                </Item>
                <Item onClick={onClick} data={{ type: "insert", input: props.input, payload: `<span class=""></span>` }}>
                    Generic span-Tag
                </Item>
                <Item onClick={onClick} data={{ type: "insert", input: props.input, payload: `<ul>\n<li><strong> &middot;</strong> <span class="lesser-note"> ppt</span></li>\n</ul>` }}>
                    List Beginning
                </Item>
                <Item onClick={onClick} data={{ type: "insert", input: props.input, payload: `<p><strong> &middot;</strong> <span class="lesser-note"> ppt</span></p>` }}>
                    Paragraph Beginning
                </Item>
            </Submenu>
            <Separator />
            <Submenu label="Copy to Clipboard" arrow="&#9656;">
                <Item onClick={onClick} data={{ type: "copy", payload: `<span class="lesser-note"></span>` }}>Lesser Note Span</Item>
                <Item onClick={onClick} data={{ type: "copy", payload: ` &middot; ` }}>Spaced Out Middot</Item>
            </Submenu>
        </Menu>
    );
}

export default HTMLHelpContextMenu2;