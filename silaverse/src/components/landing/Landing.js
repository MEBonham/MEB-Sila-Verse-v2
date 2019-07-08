import React from 'reactn';
import { Link } from 'react-router-dom';

import Accordion from '../sidebar/Accordion';

const Landing = () => {

    const toc = [
        <div label="Table of Contents">
            <section>
                <h3>Sila Scouts &middot; Superhero Party, PL12</h3>
                <p className="lesser-note">The Sila Scouts are this setting's premier superhero team. Though they are native to the USA, they operate worldwide.</p>
                <ul>
                    <li><Link to="/viewhero/shavala">Shavala</Link> <strong>&middot;</strong> <span className="lesser-note">A speedster and leader with an ancient artifact of power and a yin-yang theme</span></li>
                    <li><Link to="/viewhero/wildran">Wildran</Link> <strong>&middot;</strong> <span className="lesser-note">A shaman wielding the spirits of nature</span>
                        <ul>
                            <li>Summoned <Link to="/viewhero/wildranstormspirit">Storm Spirit</Link></li>
                            <li>Summoned <Link to="/viewhero/wildranearthspirit">Earth Spirit</Link></li>
                            <li>Summoned <Link to="/viewhero/wildranfirespirit">Fire Spirit</Link></li>
                        </ul></li>
                </ul>
            </section>
        </div>
    ];

    const settingDesc = [
        <div label="Power Origins">
            <section>
                <h3>Psionics</h3>
                <p>A few sapient creatures throughout history have had the unusual ability to bend reality to their will in various ways.</p>
            </section>
            <section>
                <h3>Mysticism: Channeling the Energy of the Collective Unconscious</h3>
                <p>The minds of all sentient creatures have power of their own; not enough to warp our reality directly, like a psionic power, but enough to pool together to create alternate realities.</p>
            </section>
        </div>
    ];

    return (
        <div className="landing-envelope">
            <section className="landing">
                <section className="introduction">
                    <h2>Introduction</h2>
                    <p>The Sila-Verse is a setting for the <em>Mutants and Masterminds 3rd Edition Roleplaying Game</em> by <a href="https://greenronin.com/" target="_blank">Green Ronin</a>. It is set in a near-future version of Earth, and is designed to accomodate series with a wide variety of Power Levels.</p>
                </section>
                <section className="toc">
                    <h2>Table of Contents (with brief synopses)</h2>
                    <Accordion>
                        {toc}
                    </Accordion>
                </section>
                <section className="setting-info">
                    <h2>Setting Description</h2>
                    <p>The lore of the Sila-Verse as a whole, not pertaining to any specific characters.</p>
                    <Accordion>
                        {settingDesc}
                    </Accordion>
                </section>
            </section>
        </div>
    )
}

export default Landing;