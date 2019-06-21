import React, { useState, useEffect, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

import firebase from '../../fbConfig';

import { PptTotalsProvider } from '../../hooks/PptTotalsContext';

import { packageHeroForGlobal } from '../edithero/EditHelperFcts';
import AbilitiesSection from './AbilitiesSection';
import PowersSection from './PowersSection';
import AdvantagesSection from './AdvantagesSection';
import SkillsSection from './SkillsSection';
import DefensesSection from './DefensesSection';
import OffenseSection from './OffenseSection';
import ComplicationsSection from './ComplicationsSection';
import BioSection from './BioSection';
import NotesSection from './NotesSection';

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

    const [ activeForm, setActiveForm ] = useState(0);
    const [ hasForms, setHasForms ] = useState(false);
    const [ thisHeroPrime, setThisHeroPrime ] = useState(null);
    useEffect(() => {
        if (thisHero && thisHero.forms && thisHero.forms.length) {
            setHasForms(true);
            if (activeForm > 0) {
                const db = firebase.db;
                const formName = thisHero.forms[activeForm - 1];
                db.collection("forms").doc(`${thisHero.urlid}.${formName}`)
                    .get()
                    .then(doc => {
                        setThisHeroPrime(packageHeroForGlobal(`${thisHero.urlid}.${formName}`, doc.data()));
                    })
                    .catch(err => {
                        console.log("Error retrieving form from db:", err);
                    });
            } else {
                setThisHeroPrime(thisHero);
            }
        } else if (thisHero) {
            setHasForms(false);
            setThisHeroPrime(thisHero);
        }
    }, [ thisHero, activeForm ]);
    
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

    const handleTabSelect = ev => {
        // console.log(ev.target.id);
        setActiveForm(parseInt(ev.target.id.split("-")[2]));
    }

    if (thisHero && thisHeroPrime) {
        let heroTypeEl;
        if (thisHero.subHero && thisHero.subHero.length) {
            const subHeroSplit = thisHero.subHero.split("\\");
            const toString = `./${DOMPurify.sanitize(subHeroSplit[1])}`;
            heroTypeEl = <p className="hero-type">{thisHero.heroType} <Link to={toString}>{subHeroSplit[0]}</Link></p>;
        } else if (thisHero.heroType && thisHero.heroType.length) {
            heroTypeEl = <p className="hero-type">{thisHero.heroType}</p>;
        } else {
            heroTypeEl = null;
        }
        let tabDiv;
        if (hasForms) {
            tabDiv = (
                <nav className="char-sheet-tabs">
                    <div className={activeForm === 0 ? "char-sheet-tab active" : "char-sheet-tab"} id="form-tab-0" onClick={handleTabSelect}>
                        <label id="form-tab-0">{thisHero.formTitle || thisHero.urlid}</label>
                    </div>
                    {thisHero.forms && thisHero.forms.length && thisHero.forms.map((formName, i) => {
                        // const styleStr = `width: calc(100% / ${thisHero.forms.length});`;
                        return(
                            <div
                                key={i + 1}
                                className={activeForm === (i + 1) ? "char-sheet-tab active" : "char-sheet-tab"}
                                id={`form-tab-${i + 1}`}
                                onClick={handleTabSelect}
                            >
                            <label id={`form-tab-${i + 1}`}>{thisHeroPrime.formTitle || formName}</label>
                            </div>
                        );
                    })}
                </nav>
            );
        } else {
            tabDiv = null;    
        }
        return(
            <PptTotalsProvider value={{ pptTotals, setPptTotals }}>
                <div className="char-sheet-envelope">
                    <div className={hasForms ? "char-sheet-paper has-tabs" : "char-sheet-paper"}>
                        {tabDiv}
                        <section className="char-sheet">
                            <header>
                                <h1>{thisHeroPrime.name}</h1>
                                <h2>{thisHeroPrime.identity}</h2>
                                {heroTypeEl}
                                <p className="last-header-line">Power Level {thisHeroPrime.powerLevel} ({finalTotal} ppt)</p>
                            </header>
                            <AbilitiesSection hero={thisHeroPrime} />
                            <PowersSection hero={thisHeroPrime} />
                            <AdvantagesSection hero={thisHeroPrime} />
                            <SkillsSection hero={thisHeroPrime} />
                            <DefensesSection hero={thisHeroPrime} />
                            <OffenseSection hero={thisHeroPrime} />
                            <ComplicationsSection hero={thisHeroPrime} />
                            <section className="pointTotals">
                                <h3><strong>ABILITIES</strong> [ {pptTotals.abilities} ] + <strong>SKILLS</strong> [ {pptTotals.skills} ] 
                                    + <strong>ADVANTAGES</strong> [ {pptTotals.advantages} ] + <strong>POWERS</strong> [ {pptTotals.powers} ] 
                                    + <strong>DEFENSES</strong> [ {pptTotals.defenses} ]</h3>
                                <h2><strong>= {finalTotal} PPT TOTAL</strong></h2>
                            </section>
                            <BioSection hero={thisHeroPrime} />
                        </section>
                    </div>
                    <NotesSection hero={thisHeroPrime} />
                </div>
            </PptTotalsProvider>
        );
    } else {
        return(<section></section>);
    }
}

export default CharSheet;