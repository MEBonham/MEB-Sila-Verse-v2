import React, { useState, useEffect, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';

const StaminaAnalysis = () => {

    const [ heroes ] = useGlobal('heroes');
    const [ objStructure, setObjStructure ] = useState({});
    const [ display, setDisplay ] = useState([]);
    const abbr = "sta";

    const sortByName = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            return 0;
        }
    }

    const sortByNumber = (a, b) => {
        if (isNaN(a)) {
            return -1;
        } else if (isNaN(b)) {
            return 1;
        } else {
            return Number(a) - Number(b);
        }
    }

    useEffect(() => {
        if (heroes) {
            let obj = {};
            heroes.sort(sortByName).forEach(hero => {
                const eff = hero.abilities[abbr].eff;
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
        <section className="stamina-analysis">
            <h2>Stamina</h2>
            {display}
        </section>
    );
}

export default StaminaAnalysis;