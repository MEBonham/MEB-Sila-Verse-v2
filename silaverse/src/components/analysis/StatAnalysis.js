import React from 'reactn';
import { Route, NavLink } from 'react-router-dom';

import PowerLevelAnalysis from './PowerLevelAnalysis';
import StrengthAnalysis from './StrengthAnalysis';
import StaminaAnalysis from './StaminaAnalysis';
import AgilityAnalysis from './AgilityAnalysis';
import DexterityAnalysis from './DexterityAnalysis';
import FightingAnalysis from './FightingAnalysis';
import IntellectAnalysis from './IntellectAnalysis';
import AwarenessAnalysis from './AwarenessAnalysis';
import PresenceAnalysis from './PresenceAnalysis';

const StatAnalysis = () => {
    return(
        <section className="analysis-envelope">
            <header>
                <nav>
                    <NavLink to="/analysis/strength">Strength</NavLink>
                    <NavLink to="/analysis/stamina">Stamina</NavLink>
                    <NavLink to="/analysis/agility">Agility</NavLink>
                    <NavLink to="/analysis/dexterity">Dexterity</NavLink>
                    <NavLink to="/analysis/fighting">Fighting</NavLink>
                    <NavLink to="/analysis/intellect">Intellect</NavLink>
                    <NavLink to="/analysis/awareness">Awareness</NavLink>
                    <NavLink to="/analysis/presence">Presence</NavLink>
                </nav>
            </header>
            <div className="for-padding">
                <h1>Setting Stat Analysis</h1>
                <Route exact path="/analysis" component={PowerLevelAnalysis} />
                <Route path="/analysis/strength" component={StrengthAnalysis} />
                <Route path="/analysis/stamina" component={StaminaAnalysis} />
                <Route path="/analysis/agility" component={AgilityAnalysis} />
                <Route path="/analysis/dexterity" component={DexterityAnalysis} />
                <Route path="/analysis/fighting" component={FightingAnalysis} />
                <Route path="/analysis/intellect" component={IntellectAnalysis} />
                <Route path="/analysis/awareness" component={AwarenessAnalysis} />
                <Route path="/analysis/presence" component={PresenceAnalysis} />
            </div>
        </section>
    );
}

export default StatAnalysis;