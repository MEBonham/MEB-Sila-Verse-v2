import React, { useState, useEffect, useGlobal } from 'reactn';

import { PptTotalsProvider } from '../../hooks/PptTotalsContext';

import AbilitiesSection from './AbilitiesSection';
import PowersSection from './PowersSection';
import AdvantagesSection from './AdvantagesSection';
import SkillsSection from './SkillsSection';
import DefensesSection from './DefensesSection';
import OffenseSection from './OffenseSection';
import ComplicationsSection from './ComplicationsSection';

import '../../css/CharSheet.css';

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
    const [ pptTotals, setPptTotals ] = useState({
        abilities: 0,
        powers: 0,
        advantages: 0,
        skills: 0,
        defenses: 0
    });
    useEffect(() => {
        let totalVar = 0;
        Object.keys(pptTotals).forEach(type => {
            totalVar += pptTotals[type];
        });
        setFinalTotal(totalVar);
    }, [ pptTotals ]);

    if (thisHero) {
        return(
            <PptTotalsProvider value={{ pptTotals, setPptTotals }}>
                <div className="char-sheet-envelope">
                    <section className="char-sheet">
                        <header>
                            <h1>{thisHero.name}</h1>
                            <h2>{thisHero.identity}</h2>
                            <p className="hero-type">{thisHero.heroType}</p>
                            <p className="last-header-line">Power Level {thisHero.powerLevel} ({finalTotal} ppt)</p>
                        </header>
                        <AbilitiesSection hero={thisHero} />
                        <PowersSection hero={thisHero} />
                        <AdvantagesSection hero={thisHero} />
                        <SkillsSection hero={thisHero} />
                        <DefensesSection hero={thisHero} />
                        <OffenseSection hero={thisHero} />
                        <ComplicationsSection hero={thisHero} />
                        <section className="pointTotals">
                            <h3><strong>ABILITIES</strong> [ {pptTotals.abilities} ] + <strong>SKILLS</strong> [ {pptTotals.skills} ] 
                                + <strong>ADVANTAGES</strong> [ {pptTotals.advantages} ] + <strong>POWERS</strong> [ {pptTotals.powers} ] 
                                + <strong>DEFENSES</strong> [ {pptTotals.defenses} ]</h3>
                            <h2><strong>= {finalTotal} PPT TOTAL</strong></h2>
                        </section>
                    </section>
                </div>
            </PptTotalsProvider>
        );
    } else {
        return(<section></section>);
    }
}

export default CharSheet;