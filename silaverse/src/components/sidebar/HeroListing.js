import React, { useState } from 'reactn';
import { Link } from 'react-router-dom';
import { MenuProvider } from 'react-contexify';

import SidebarContextMenu from './SidebarContextMenu';

const HeroListing = props => {

    // console.log(props);

    const [ providerId ] = useState(`heroListing-${props.id}`);
    const [ url ] = useState(`/viewhero/${props.urlid}`);

    return(
        <div>
            <MenuProvider id={providerId}>
                <Link to={url}>{props.name}</Link>
            </MenuProvider>
            <SidebarContextMenu menuId={providerId} url={props.urlid} history={props.history} />
        </div>
    );
}

export default HeroListing;