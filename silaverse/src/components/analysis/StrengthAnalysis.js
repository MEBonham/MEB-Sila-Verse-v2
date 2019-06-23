import React, { useState, useEffect, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';

import { sortByName, sortByNumber, sortByNameAndTitle, allHaveTheSameVal } from './SortFcts';

const StrengthAnalysis = () => {

    const [ heroes ] = useGlobal('heroes');
    const [ forms ] = useGlobal('forms');
    const [ objStructure, setObjStructure ] = useState({});
    const [ display, setDisplay ] = useState([]);
    const abbr = "str";

    useEffect(() => {
        if (heroes && forms) {
            let obj = {};
            heroes.sort(sortByName).forEach(hero => {
                if (hero.forms && hero.forms.length) {
                    let formsArr = [
                        hero,
                        ...forms.filter(form => form.subHero === `*${hero.urlid}`)
                    ];
                    formsArr = formsArr.filter(form => !form.excludeFromAnalysis);                                    
                    if (formsArr.length < 2 || allHaveTheSameVal(formsArr, abbr)) {
                        const eff = hero.abilities[abbr].eff;
                        if (obj[eff]) {
                            obj[eff].push(hero);
                        } else {
                            obj[eff] = [ hero ];
                        }
                    } else {
                        formsArr = formsArr.map(formObj => ({
                            ...formObj,
                            nameAndTitle: `${formObj.name} (${formObj.formTitle})`
                        }));
                        formsArr.sort(sortByNameAndTitle);
                        formsArr.forEach(formObj => {
                            const eff = formObj.abilities[abbr].eff;
                            if (obj[eff]) {
                                obj[eff].push(formObj);
                            } else {
                                obj[eff] = [ formObj ];
                            }
                        });
                    }
                } else if (!hero.excludeFromAnalysis) {
                    const eff = hero.abilities[abbr].eff;
                    if (obj[eff]) {
                        obj[eff].push(hero);
                    } else {
                        obj[eff] = [ hero ];
                    }
                }
            });
            setObjStructure(obj);
        }
    }, [ heroes, forms ]);

    useEffect(() => {
        if (objStructure) {
            const displayCopy = Object.keys(objStructure).sort(sortByNumber).reverse().map(num => (
                <p key={num}><span className="with-colon"><strong>{num}:</strong></span> {objStructure[num].map((hero, i) => {
                    const comma = (i === objStructure[num].length - 1) ? null : ", ";
                    return(
                        <span key={hero.urlid}><Link to={`/viewhero/${hero.urlid}`}>{hero.nameAndTitle || hero.name}</Link>{comma}</span>
                    )
                })}</p>
            ));
            setDisplay(displayCopy);
        }
    }, [ objStructure ]);

    return(
        <section className="strength-analysis">
            <h2>Strength</h2>
            {display}
        </section>
    );
}

export default StrengthAnalysis;