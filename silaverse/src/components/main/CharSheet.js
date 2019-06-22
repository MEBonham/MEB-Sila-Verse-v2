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
    
    const [ heroes, setHeroes ] = useGlobal('heroes');
    const [ thisHero, setThisHero ] = useState(null);
    const [ thisHeroPrime, setThisHeroPrime ] = useState(null);
    const [ activeForm, setActiveForm ] = useState(0);
    const [ tabDiv, setTabDiv ] = useState(null);
    const [ finalTotal, setFinalTotal ] = useState(0);
    const [ pptTotals, setPptTotals ] = useState({
        abilities: 0,
        powers: 0,
        advantages: 0,
        skills: 0,
        defenses: 0
    });
    
    useEffect(() => {
        if (heroes) {
            const filteredHeroes = heroes.filter(hero => hero.urlid === urlid);
            if (filteredHeroes.length) {
                setThisHero(filteredHeroes[0]);
                if (filteredHeroes[0].lastFormViewed) {
                    setActiveForm(filteredHeroes[0].lastFormViewed);
                } else {
                    setActiveForm(0);
                }
            }
        }
    }, [ urlid, heroes ]);

    useEffect(() => {
        if (thisHero && thisHero.forms && thisHero.forms.length && (activeForm > 0)) {
            const db = firebase.db;
            const formUrlid = thisHero.forms[activeForm - 1];
            db.collection("forms").doc(`${thisHero.urlid}.${formUrlid}`)
                .get()
                .then(doc => {
                    setThisHeroPrime(packageHeroForGlobal(`${thisHero.urlid}.${formUrlid}`, doc.data()));
                })
                .catch(err => {
                    console.log("Error getting form info from db", err);
                });
        } else {
            setThisHeroPrime(thisHero);
        }
    }, [ thisHero, activeForm ]);

    useEffect(() => {
        if (thisHero && thisHero.forms && thisHero.forms.length) {
            const newTitlesList = {};
            const db = firebase.db;
            thisHero.forms.forEach(formUrlid => {
                db.collection("forms").doc(`${thisHero.urlid}.${formUrlid}`)
                    .get()
                    .then(doc => {
                        newTitlesList[formUrlid] = doc.data().formTitle;
                        console.log(newTitlesList);
                        setTabDiv(
                            <nav className="char-sheet-tabs">
                                <div className={activeForm === 0 ? "char-sheet-tab active" : "char-sheet-tab"} id="form-tab-0" onClick={handleTabSelect}>
                                    <label id="form-tab-0">{thisHero.formTitle || thisHero.urlid}</label>
                                </div>
                                {thisHero.forms && thisHero.forms.length && thisHero.forms.map((formName, i) => {                        
                                    return(
                                        <div
                                            key={i + 1}
                                            className={activeForm === (i + 1) ? "char-sheet-tab active" : "char-sheet-tab"}
                                            id={`form-tab-${i + 1}`}
                                            onClick={handleTabSelect}
                                        >
                                        <label id={`form-tab-${i + 1}`}>{newTitlesList[formName] || formName}</label>
                                        </div>
                                    );
                                })}
                            </nav>
                        );
                    })
                    .catch(err => {
                        console.log("Error getting FormTitles of various forms:", err);
                    })
            })
        } else {
            setTabDiv(null);
        }
    }, [ thisHero ]);

    useEffect(() => {
        let totalVar = 0;
        Object.keys(pptTotals).forEach(type => {
            totalVar += pptTotals[type];
        });
        setFinalTotal(totalVar);
    }, [ pptTotals ]);

    const handleTabSelect = ev => {
        const formIndex = parseInt(ev.target.id.split("-")[2]);
        const minusOneHero = heroes.filter(hero => (hero.urlid !== urlid));
        setHeroes([
            ...minusOneHero,
            {
                ...thisHero,
                lastFormViewed: formIndex
            }
        ]);
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
        return(
            <PptTotalsProvider value={{ pptTotals, setPptTotals }}>
                <div className="char-sheet-envelope">
                    <section className="char-sheet-paper">
                        {tabDiv}
                        <div className="char-sheet">
                            <header>
                                <h1>
                                    {thisHeroPrime.name}
                                    {thisHeroPrime.formTitle ? ` (${thisHeroPrime.formTitle})` : null}
                                </h1>
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
                        </div>
                    </section>
                    <NotesSection hero={thisHeroPrime} />
                </div>
            </PptTotalsProvider>
        );
    } else {
        return(<section></section>);
    }
}

export default CharSheet;