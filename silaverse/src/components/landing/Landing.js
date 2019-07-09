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
                        </ul>
                    </li>
                    <li><Link to="/viewhero/devni">Devni</Link> <strong>&middot;</strong> <span className="lesser-note">A cybernetically-enhanced inventor with high-tech gadgets including a bazooka</span></li>
                    <li><Link to="/viewhero/tigerstrike">Tiger Strike</Link> <strong>&middot;</strong> <span className="lesser-note">A tiger-themed urban vigilante</span></li>
                    <li><Link to="/viewhero/volt">Volt</Link> <strong>&middot;</strong> <span className="lesser-note">A robot with self-esteem issues and a pet alien snake</span>
                        <ul>
                            <li>Sidekick <Link to="/viewhero/yvaaqish">Yvaaqish</Link></li>
                        </ul>
                    </li>
                </ul>
            </section>
            <section>
                <h3>Knights of the Swart Lair &middot; Superhero Party, PL10</h3>
                <p className="lesser-note">Dr. Dark and his Knights are a shadowy team operating out of Serbia throughout Eastern Europe.</p>
                <ul>
                    <li><Link to="/viewhero/drdark">Dr. Dark</Link> <strong>&middot;</strong> <span className="lesser-note">A creepy doctor-magician-gunslinger with an extradimensional castle</span>
                        <ul>
                            <li>Summoned <Link to="/viewhero/drdarkgremlin">Gremlins</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/viewhero/zvasha">Zvasha</Link> <strong>&middot;</strong> <span className="lesser-note">An urban detective and martial artist</span></li>
                    <li><Link to="/viewhero/feezh">Feezh</Link> <strong>&middot;</strong> <span className="lesser-note">A holy-themed power armor wielder</span></li>
                    <li><Link to="/viewhero/splice">Splice</Link> <strong>&middot;</strong> <span className="lesser-note">A shapeshifter with five themed forms</span></li>
                </ul>
            </section>
            <section>
                <h3>The UAL ("Unite Africa League") &middot; Superhero Party, PL10</h3>
                <p className="lesser-note">The UAL, as its name gives away, is the main superhero team servicing Africa.</p>
                <ul>
                    <li><Link to="/viewhero/sahara">Sahara</Link> <strong>&middot;</strong> <span className="lesser-note">A salt sheikh and hacker who travels the great Sahara Desert restlessly</span></li>
                    <li><Link to="/viewhero/abuja">Abuja</Link> <strong>&middot;</strong> <span className="lesser-note">A speedy reformed thief from the western metropolises of Nigeria</span></li>
                    <li><Link to="/viewhero/victoria">Victoria</Link> <strong>&middot;</strong> <span className="lesser-note">An immortal spirit representing the Great Rift Valley</span></li>
                    <li><Link to="/viewhero/elephantman">Elephant Man</Link> <strong>&middot;</strong> <span className="lesser-note">A park ranger and detective who can shift into an anthropomorphic elephant</span></li>
                    <li><Link to="/viewhero/jinx">Jinx</Link> <strong>&middot;</strong> <span className="lesser-note">A southwestern Witch-Doctor</span></li>
                    <li><Link to="/viewhero/frungle">Frungle</Link> <strong>&middot;</strong> <span className="lesser-note">Inexplicably helped out by monkeys everywhere he goes</span></li>
                </ul>
            </section>
            <section>
                <h3>Gulslayers &middot; Superhero Party, PL7</h3>
                <p className="lesser-note">The Gulslayers, four Israeli Krav Maga masters, are a squad of counter-terrorist vigilantes, who spend most of their time hunting Haffru bin Ghoul.</p>
                <ul>
                    <li><Link to="/viewhero/browngulslayer">Brown Gulslayer</Link> <strong>&middot;</strong> <span className="lesser-note">The team's leader and face</span></li>
                    <li><Link to="/viewhero/blackgulslayer">Black Gulslayer</Link> <strong>&middot;</strong> <span className="lesser-note">The team's parkour master and wreslting specialist</span></li>
                    <li><Link to="/viewhero/tangulslayer">Tan Gulslayer</Link> <strong>&middot;</strong> <span className="lesser-note">The team's lucky jack-of-all-trades</span>
                        <ul>
                            <li>Minion <Link to="/viewhero/avram">Avram</Link> <strong>&middot;</strong> <span className="lesser-note">The team dog</span></li>
                        </ul>
                    </li>
                    <li><Link to="/viewhero/graygulslayer">Gray Gulslayer</Link> <strong>&middot;</strong> <span className="lesser-note">The team's genius investigator</span></li>
                </ul>
            </section>
            <section>
                <h3>Champions of Nations</h3>
                <p className="lesser-note">A few of the world's luckier countries have secured themselves official bonds with superheroes, gaining full-time protection.</p>
                <ul>
                    <li><Link to="/viewhero/aspect">Aspect</Link> (PL10; Singapore) <strong>&middot;</strong> <span className="lesser-note">Can summon powerful and specialized spirits that are aspects of their personality</span>
                        <ul>
                            <li>Summoned <Link to="/viewhero/aspectassassinfiend">Assassin Fiend</Link> <strong>&middot;</strong> <span className="lesser-note">A specialist in quick long-distance killing</span></li>
                            <li>Summoned <Link to="/viewhero/aspectbodyguard">Bodyguard</Link> <strong>&middot;</strong> <span className="lesser-note">The weakest aspect, specialized in protecting and healing its master</span></li>
                            <li>Summoned <Link to="/viewhero/aspectbrain">Brain-in-a-Jar</Link> <strong>&middot;</strong> <span className="lesser-note">The incarnation of Aspect's brainpower</span></li>
                            <li>Summoned <Link to="/viewhero/aspectflyingmount">Flying Mount</Link> <strong>&middot;</strong> <span className="lesser-note">A semi-dragon-like means of long-distance transportation</span></li>
                            <li>Summoned <Link to="/viewhero/aspectfontofluck">Font of Luck</Link> <strong>&middot;</strong> <span className="lesser-note">The incarnation of Aspect's good fortune</span></li>
                            <li>Summoned <Link to="/viewhero/aspectinfiltratingshade">Infiltrating Shade</Link> <strong>&middot;</strong> <span className="lesser-note">Aspect's master spy</span></li>
                            <li>Summoned <Link to="/viewhero/aspectlockdownbrute">Lockdown Brute</Link> <strong>&middot;</strong> <span className="lesser-note">A specialist in preventing a single target from fleeing</span></li>
                            <li>Summoned <Link to="/viewhero/aspectnymph">Nymph</Link> <strong>&middot;</strong> <span className="lesser-note">The incarnation of Aspect's social skills and sexual appeal</span></li>
                            <li>Summoned <Link to="/viewhero/aspectwildwarrior">Wild Warrior</Link> <strong>&middot;</strong> <span className="lesser-note">A well-rounded combatant and wilderness survivor</span></li>
                        </ul>
                    </li>
                    <li><Link to="/viewhero/gloria">Gloria</Link> (PL13, Indonesia) <strong>&middot;</strong> <span className="lesser-note">An enlightened flying woman brimming with light-powers</span></li>
                    <li><Link to="/viewhero/kestrel">Kestrel</Link> (PL9, United States of America) <strong>&middot;</strong> <span className="lesser-note">A flier of several talents, who must balance superhero work with politics</span></li>
                    <li><Link to="/viewhero/quetzalcoatl">Quetzalcoatl</Link> (PL11, Guatemala) <strong>&middot;</strong> <span className="lesser-note">A benevolent feathered serpent, incarnation of local myths</span></li>
                </ul>
            </section>
            <section>
                <h3>Miscellaneous Superheroes</h3>
                <ul>
                    <li><Link to="/viewhero/dejavu">Dejavu</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">Can split into up to 5 copies of himself, who are effectively PL6 each</span>
                        <ul>
                            <li>Summoned <Link to="/viewhero/dejavuclone">Clone of Dejavu</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/viewhero/hedgehog">Hedgehog</Link> (PL8) <strong>&middot;</strong> <span className="lesser-note">A hedgehog-themed sueprhero</span></li>
                    <li><Link to="/viewhero/velarra">Velarra</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">Devni's sister, a versatile cyborg solo agent</span></li>
                </ul>
            </section>
            <section>
                <h3>Chinese Government Mercs</h3>
                <p className="lesser-note">The powerful Chinese government has access to quite a few powerful entities, which it hires out to both noble and nefarious causes</p>
                <ul>
                    <li><Link to="/viewhero/gearshift">Gearshift</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">A war machine who can transform into three forms</span></li>
                    <li><Link to="/viewhero/vinelash">Vine Lash</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">A plant-controller</span></li>
                </ul>
            </section>
            <section>
                <h3>Master Villains</h3>
                <ul>
                    <li><Link to="/viewhero/errdravalimus">Errdravalimus</Link> (PL14) <strong>&middot;</strong> <span className="lesser-note">Draconic hands-off dictator of Scandinavia</span></li>
                    <li><Link to="/viewhero/haffrubinghoul">Haffru bin Ghoul</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">A regenerating super-soldier produced by radical extremist Islam</span></li>
                    <li><Link to="/viewhero/presidentlandry">President Landry Archambault</Link> (PL8) <strong>&middot;</strong> <span className="lesser-note">The corrupt and unfriendly de facto leader of Western Europe</span></li>
                    <li><Link to="/viewhero/bowlingpin">The Bowling Pin</Link> (PL8) <strong>&middot;</strong> <span className="lesser-note">Tiger Strike's nemesis, head of the Kansas City mob</span>
                        <ul>
                            <li>Sidekick <Link to="/viewhero/nikayris">Nik Ayris</Link> <strong>&middot;</strong> <span className="lesser-note">A genius absent-minded scientist</span></li>
                        </ul>
                    </li>
                    <li><Link to="/viewhero/tickpocket">The Tickpocket</Link> (PL7) <strong>&middot;</strong> <span className="lesser-note">A time-traveling art thief scoundrel</span></li>
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
                <p>The minds of all sentient creatures have power of their own; not enough to warp our reality directly, like a psionic power, but enough to pool together to create alternate realities. These other "dimensions" are local to Earth, and are myriad in number and variety.</p>
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