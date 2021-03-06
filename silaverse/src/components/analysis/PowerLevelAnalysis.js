import React, { useState, useEffect, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';

import { sortByName, sortByNumber } from './SortFcts';

const PowerLevelAnalysis = () => {

    const [ heroes ] = useGlobal('heroes');
    const [ objStructure, setObjStructure ] = useState({});
    const [ display, setDisplay ] = useState([]);

    useEffect(() => {
        if (heroes) {
            let obj = {};
            heroes.sort(sortByName).forEach(hero => {
                const eff = hero.powerLevel;
                if (obj[eff]) {
                    obj[eff].push(hero);
                } else {
                    obj[eff] = [ hero ];
                }
            });
            setObjStructure(obj);
        }
    }, [ heroes ]);

    useEffect(() => {
        if (objStructure) {
            const displayCopy = Object.keys(objStructure).sort(sortByNumber).reverse().map(num => (
                <p key={num}><span className="with-colon"><strong>{num}:</strong></span> {objStructure[num].map((hero, i) => {
                    const comma = (i === objStructure[num].length - 1) ? null : ", ";
                    return(
                        <span key={hero.urlid}><Link to={`/viewhero/${hero.urlid}`}>{hero.name}</Link>{comma}</span>
                    )
                })}</p>
            ));
            setDisplay(displayCopy);
        }
    }, [ objStructure ]);

    return(
        <section className="power-level-analysis">
            <h2>Power Levels</h2>
            {display}
        </section>
    );
}

export default PowerLevelAnalysis;