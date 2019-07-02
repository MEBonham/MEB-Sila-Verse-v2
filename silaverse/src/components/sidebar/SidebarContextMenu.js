import React from 'reactn';
import { Menu, Item, Separator, Submenu } from 'react-contexify';
import { HashLink } from 'react-router-hash-link';

const SidebarContextMenu = props => {
    
    const handleClick = ({ event, props }) => {
        switch (props.type) {
            case "edit":
                props.history.push({
                    pathname: props.url
                });
                break;
            case "newTab":
                window.open(props.url);
                break;
            case "copyAddress":
                navigator.clipboard.writeText(event.target.href)
                    .then()
                    .catch(err => {
                        console.log("Unable to copy to clipboard;", err);
                    });
                break;
            default:
                console.log("Unrecognized Menu Option");
        }
    }

    const formsMenu = (props.forms && props.forms.length) ?
        <Submenu label="Edit Hero's Forms" arrow="&#9656;">
            {props.forms.map(formName => (
                <Item
                    key={formName}
                    onClick={handleClick}
                    data={{ type: "edit", url: `/edithero/${props.url}.${formName}`, history: props.history }}
                >{formName}</Item>
            ))}
        </Submenu> :
        null;

    return(
        <Menu id={props.menuId}>
            <Item onClick={handleClick} data={{ type: "edit", url: `/edithero/${props.url}`, history: props.history }}>Edit Hero</Item>
            {formsMenu}
            <Submenu label="Edit Hero by Section" arrow="&#9656;">
                <Item>
                    <HashLink to={`/edithero/${props.url}#abilities-section`}>Abilities</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#powers-section`}>Powers</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#advantages-section`}>Advantages</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#skills-section`}>Skills</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#defenses-section`}>Defenses</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#offense-section`}>Offense</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#complications-section`}>Complications</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#bio-section`}>Bio</HashLink>
                </Item>
                <Item>
                    <HashLink to={`/edithero/${props.url}#notes-section`}>Notes</HashLink>
                </Item>
            </Submenu>
            <Item onClick={handleClick} data={{ type: "newTab", url: `/viewhero/${props.url}` }}>View Hero in New Tab</Item>
            <Separator />
            <Item onClick={handleClick} data={{ type: "copyAddress", url: `/viewhero/${props.url}` }}>Copy Link Address</Item>
        </Menu>
    );
}

export default SidebarContextMenu;