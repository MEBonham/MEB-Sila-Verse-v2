import React, { useState, useEffect, useGlobal } from 'reactn';

import AbilitiesSection from './AbilitiesSection';
import PowersSection from './PowersSection';

const CharSheet = props => {

    const { urlid } = props.match.params;
    const [ heroes ] = useGlobal('heroes');
    const filteredHeroes = heroes ?
        heroes.filter(hero => hero.urlid === urlid) :
        [];
    const [ thisHero, setThisHero ] = useState(null);
    if (filteredHeroes.length && thisHero !== filteredHeroes[0]) {
        setThisHero(filteredHeroes[0]);
    }
    
    const [ finalTotal, setFinalTotal ] = useState(0);
    const [ pptTotals ] = useGlobal('pptTotals');
    useEffect(() => {
        let totalVar = 0;
        Object.keys(pptTotals).forEach(type => {
            totalVar += pptTotals[type];
        });
        setFinalTotal(totalVar);
    }, [ thisHero, pptTotals ]);

    if (thisHero) {
        return(
            <section className="char-sheet">
                <header>
                    <h1>{thisHero.name}</h1>
                    <h2>{thisHero.identity}</h2>
                    <p className="hero-type">{thisHero.heroType}</p>
                    <p className="last-header-line">Power Level {thisHero.powerLevel} ({finalTotal} ppt)</p>
                </header>
                <AbilitiesSection hero={thisHero} />
                <PowersSection hero={thisHero} />
            </section>
        );
    } else {
        return(<section></section>);
    }
}

export default CharSheet;