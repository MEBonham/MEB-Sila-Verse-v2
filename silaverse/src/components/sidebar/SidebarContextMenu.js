import React from 'reactn';
import { Link } from 'react-router-dom';
import { Menu, Item, Separator, Submenu } from 'react-contexify';

const SidebarContextMenu = props => {
    
    const onClick = ({ event, props }) => {
        switch (props.type) {
            case "edit":
                props.history.push({
                    pathname: props.url,
                    // hash: props.anchor
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

    return(
        <Menu id={props.menuId}>
            <Item onClick={onClick} data={{ type: "edit", url: `/edithero/${props.url}`, history: props.history }}>Edit Hero</Item>
            <Submenu label="Edit Hero by Section" arrow="&#9656;">
                {/* <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`abilities-section` }}> */}
                <Item>
                    <Link to={{ pathname: `edithero/${props.url}`, hash: `abilities-section` }}>Abilities</Link>
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`powers-section` }}>
                    Powers
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`advantages-section` }}>
                    Advantages
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`skills-section` }}>
                    Skills
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`defenses-section` }}>
                    Defenses
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`offense-section` }}>
                    Offense
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`complications-section` }}>
                    Complications
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`bio-section` }}>
                    Bio
                </Item>
                <Item onClick={onClick} data={{ type: "edit", url: `edithero/${props.url}`, anchor:`notes-section` }}>
                    Notes
                </Item>
            </Submenu>
            <Item onClick={onClick} data={{ type: "newTab", url: `/viewhero/${props.url}` }}>View Hero in New Tab</Item>
            <Separator />
            <Item onClick={onClick} data={{ type: "copyAddress", url: `/viewhero/${props.url}` }}>Copy Link Address</Item>
        </Menu>
    );
}

export default SidebarContextMenu;