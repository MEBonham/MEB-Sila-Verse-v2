import React from 'reactn';
import { Menu, Item, Separator } from 'react-contexify';

const SidebarContextMenu = props => {
    
    const onClick = ({ event, props }) => {
        switch (props.type) {
            case "edit":
                props.history.push(props.url);
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
            <Item onClick={onClick} data={{ type: "newTab", url: `/viewhero/${props.url}` }}>View Hero in New Tab</Item>
            <Separator />
            <Item onClick={onClick} data={{ type: "copyAddress", url: `/viewhero/${props.url}` }}>Copy Link Address</Item>
        </Menu>
    );
}

export default SidebarContextMenu;