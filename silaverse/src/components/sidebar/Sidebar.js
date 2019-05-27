import React, { useGlobal } from 'reactn';
import { Link } from 'react-router-dom';

import HeroListing from './HeroListing';

const Sidebar = props => {

    // console.log(props);

    const [ heroes ] = useGlobal('heroes');
    const heroList = heroes ?
        heroes.map(hero => {
            return (<HeroListing key={hero.id} id={hero.id} urlid={hero.urlid} name={hero.name} history={props.history} />)
        }) :
        "";

    return(
        <section className="full-sidebar">
            <Link to="/newhero">New Hero</Link>
            <div className="hero-tree">
                {heroList}
            </div>
        </section>
    );
}

export default Sidebar;