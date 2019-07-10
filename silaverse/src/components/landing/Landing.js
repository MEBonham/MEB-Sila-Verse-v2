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
                    <li><Link to="/viewhero/hedgehog">Hedgehog</Link> (PL8) <strong>&middot;</strong> <span className="lesser-note">A hedgehog-themed superhero</span></li>
                    <li><Link to="/viewhero/velarra">Velarra</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">Devni's sister, a versatile cyborg solo agent</span></li>
                </ul>
            </section>
            <section>
                <h3>Chinese Government Mercs</h3>
                <p className="lesser-note">The powerful Chinese government has access to quite a few powerful entities, which it hires out to both noble and nefarious causes.</p>
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
            <section>
                <h3>Villainous Lieutenants</h3>
                <ul>
                    <li><Link to="/viewhero/antoniobrick">Antonio the Brick</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">President Landry's loyal and vigilant bodyguard</span></li>
                    <li><Link to="/viewhero/gelnon">Gelnon</Link> (PL13) <strong>&middot;</strong> <span className="lesser-note">A mercenary super-brute with a cloning lab</span></li>
                    <li><Link to="/viewhero/glint">Glint</Link> (PL8, PC budget) <strong>&middot;</strong> <span className="lesser-note">A teleporting, strobe-light-emitting assassin with a bit of super-speed</span></li>
                </ul>
            </section>
            <section>
                <h3>Villainous Henchmen</h3>
                <ul>
                    <li><Link to="/viewhero/biker">Biker</Link> (PL2) <strong>&middot;</strong> <span className="lesser-note">A typical biker gang member</span></li>
                    <li><Link to="/viewhero/crimelord">Crime Lord</Link> (PL4) <strong>&middot;</strong> <span className="lesser-note">A generic head of local organized crime</span></li>
                    <li><Link to="/viewhero/gangleader">Gang Leader</Link> (PL3) <strong>&middot;</strong> <span className="lesser-note">Leader of a neighborhood of a street gang</span></li>
                    <li><Link to="/viewhero/goon">Goon</Link> (PL3) <strong>&middot;</strong> <span className="lesser-note">A run-of-the-mill crinimal gunman</span></li>
                    <li><Link to="/viewhero/hitman">Hitman</Link> (PL6) <strong>&middot;</strong> <span className="lesser-note">A rough-and-tumble assassin</span></li>
                    <li><Link to="/viewhero/thief">Thief</Link> (PL1) <strong>&middot;</strong> <span className="lesser-note">A common thief</span></li>
                    <li><Link to="/viewhero/thug">Thug</Link> (PL3) <strong>&middot;</strong> <span className="lesser-note">A brute sent by organized crime to punish someone but leave them alive</span></li>
                    <li><Link to="/viewhero/biker">Tough</Link> (PL2) <strong>&middot;</strong> <span className="lesser-note">A common street gang member</span></li>
                </ul>
            </section>
            <section>
                <h3>The Vord</h3>
                <p className="lesser-note">An invasive multi-formed swarming alien species that threatens Earth's system.</p>
                <ul>
                    <li><Link to="/viewhero/vorddrone">Vord Drone</Link> (PL1) <strong>&middot;</strong> <span className="lesser-note">Spider-shaped common workers</span></li>
                    <li><Link to="/viewhero/vordtorpedo">Vord Torpedo</Link> (PL9) <strong>&middot;</strong> <span className="lesser-note">Living explosive pods that can fly through outer space or burrow before going boom</span></li>
                    <li><Link to="/viewhero/vordlocust">Vord Locust</Link> (PL5) <strong>&middot;</strong> <span className="lesser-note">Expendable front-line troops that pounce and claw at enemies</span></li>
                    <li><Link to="/viewhero/vordskeeter">Vord Skeeter</Link> (PL7) <strong>&middot;</strong> <span className="lesser-note">Winged terrors that carry prey away and drain its blood</span></li>
                    <li><Link to="/viewhero/vordshepherd">Vord Shepherd</Link> (PL3) <strong>&middot;</strong> <span className="lesser-note">Tentacled brains that tend and control lesser Vord</span></li>
                    <li><Link to="/viewhero/malacrux">Malacrux</Link> (PL8) <strong>&middot;</strong> <span className="lesser-note">Agile elite bipedal Vord warriors, fighting with built-in blades and spines</span></li>
                    <li><Link to="/viewhero/vordtrebuchet">Vord Trebuchet</Link> (PL8) <strong>&middot;</strong> <span className="lesser-note">Vord artillery, huge orbs that launch organic explosives</span></li>
                    <li><Link to="/viewhero/vordghoul">Vord Ghoul</Link> (PL7) <strong>&middot;</strong> <span className="lesser-note">Human-looking infiltrators built from deceased bodies</span></li>
                    <li><Link to="/viewhero/zoavigon">Zo'avigon</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">Elite serpentine psychics, mentally versatile but physically fragile</span></li>
                    <li><Link to="/viewhero/harrux">Harrux</Link> (PL9) <strong>&middot;</strong> <span className="lesser-note">Troop transports and siege engines that grab victims with long sticky tongues</span></li>
                    <li><Link to="/viewhero/vordleviathan">Vord Leviathan</Link> (PL11) <strong>&middot;</strong> <span className="lesser-note">Colossal eel-shaped living starships</span></li>
                    <li><Link to="/viewhero/eggvector">Egg Vector</Link> (PL10) <strong>&middot;</strong> <span className="lesser-note">Small living spacecraft used by the Vord for inter-stellar spawning</span></li>
                    <li><Link to="/viewhero/vordqueen">Vord Queen</Link> (PL14) <strong>&middot;</strong> <span className="lesser-note">Huge amorphous spaceworthy hive minds that direct the Vord swarms</span>
                        <ul>
                            <li>Summoned <Link to="/viewhero/guckburp">Guckburp</Link> <strong>&middot;</strong> <span className="lesser-note">Turrets of acid that defend Vord structures</span></li>
                        </ul>
                    </li>
                    <li><Link to="/viewhero/tyracian">Tyracian</Link> (PL16) <strong>&middot;</strong> <span className="lesser-note">Gargantuan sedentary overmind of Vord in our solar system</span></li>
                </ul>
            </section>
            <section>
                <h3>Supporting NPCs</h3>
                <ul>
                    <li><Link to="/viewhero/drastro">Dr. Astro</Link> (PL4) <strong>&middot;</strong> <span className="lesser-note">Billionaire eccentric astrophysicist, sponsor of Starship Baluarte</span></li>
                    <li><Link to="/viewhero/kevlinthedevout">Kevlin the Devout</Link> (PL8, PC budget) <strong>&middot;</strong> <span className="lesser-note">A carpenter and healer who invites comparison to Jesus</span></li>
                    <li><Link to="/viewhero/mythmancer">The Mythmancer</Link> (PL11) <strong>&middot;</strong> <span className="lesser-note">A wandering drifter, possibly crazy, who brings mythical creatures to life</span></li>
                </ul>
            </section>
            <section>
                <h3>Stock NPCs</h3>
                <ul>
                    <li><Link to="/viewhero/bodyguard">Bodyguard</Link> (PL4) <strong>&middot;</strong> <span className="lesser-note">A typical bodyguard</span></li>
                    <li><Link to="/viewhero/bystander">Bystander</Link> (PL0) <strong>&middot;</strong> <span className="lesser-note">An unremarkable person</span></li>
                    <li><Link to="/viewhero/reporter">Reporter</Link> (PL1) <strong>&middot;</strong> <span className="lesser-note">A common news reporter</span></li>
                    <li><Link to="/viewhero/streetinformant">Street Informant</Link> (PL2) <strong>&middot;</strong> <span className="lesser-note">Not quite a criminal, this type gets by selling information to both sides</span></li>
                </ul>
            </section>
        </div>
    ];

    const settingDesc = [
        <div label="Power Origins">
            <section>
                <h3>Psionics: Power of the Intelligent Mind</h3>
                <p>A few sapient creatures throughout history have had the unusual ability to bend reality to their will in various ways. Channeling just the power of their own minds, they are able to accomplish effects that seem "magical" to others, especially mentally-themed effects.</p>
                <p>This is the most fundamental power origin other than "Training", but remains rare in the Sila-Verse, as it has been throughout history.</p>
            </section>
            <section>
                <h3>Mysticism: Channeling the Energy of the Collective Unconscious</h3>
                <p>The minds of all sentient creatures have power of their own; not enough to warp our reality directly, like a psionic power, but enough to pool together to create alternate realities. These other "dimensions" are local to Earth, and are myriad in number and variety.</p>
                <p>Channeling matter or creatures from these other dimensions, or even just their energy, can create effects in our reality. These effects, with their origin in the beliefs and feelings of all creatures advanced enough to <em>have</em> beliefs and feelings, are called "mystic" powers.</p>
                <p>Mysticism primarily shows up as magic (see below), but can also show up in the form of mystic artifacts, items that allow their user to accomplish specific feats of mysticism, some of them quite ancient in origin.</p>
                <p>Since the minds of animals are far more numerous (if simple) than those of humans, dimensions representing their thoughts and feelings are among the strongest. These nature-themed dimensions are categorized under the term "primal."</p>
            </section>
            <section>
                <h3>Magic: Formulaic Mysticism</h3>
                <p>The "goddess" Inanna of ancient Mesopotamia, probably a human originally, had a mind powerful enough to practice psionics, but used it to master mysticism to a degree not seen before or since. She created her own "language" of words, gestures, runes, and material symbols, and bound great amounts of mystic energy to it. By studying her rituals and formulas, others became much more able to channel mystic forces and energies themselves. This subset of mysticism is known as magic.</p>
                <p>Inanna has withered, after six millennia, to the point where she still has great knowledge, but can do little with it except keep herself alive. No one else has managed the breadth of magical ability that she has during that time.</p>
                <p>Instead, most practicioners of magic have a theme that unites their magical ability, in keeping with <em>which</em> dimensions they key off of, such as "primal" magic for those accessing the power of "primal" dimensions.</p>
                <p>Though many are able to learn magic if they set their mind to it, it remains a rare thing across the Earth, since the practice takes great dedication and magicians tend to be a secretive lot.</p>
            </section>
            <section>
                <h3>The Bequesting: A New Generation of Powers</h3>
                <p>In 1999, an alien space probe crashed and exploded in Russia after releasing a cryptic partial greeting message. Though the crash was an event in itself, it proved to be only the beginning of the true story.</p>
                <p>It turned out that as the Vord, an invasive alien species, traveled through the galaxy on their way to our solar system, one of their victim planets, Tau Cygni Bd, was inhabited by an advanced but peaceful race. When it became clear to the Tau Cygnids that they were doomed to be conquered and overrun by the Vord, they desperately prepared and launched the Bequest Probe towards Earth.</p>
                <p>The Probe contained a poorly-understood mechanism, a cloud of neutrinos and more exotic particles, that was released by the explosion of the Probe. The purpose of this mechanism? To grant superpowers to Earth's inhabitants, that they might have a chance of resisting the Vord and even avenging the Tau Cygnids. The Bequest Mechaism has traveled Earth since, seeking out lifeforms that meet its "worthiness" metrics, bestowing psionic talent or other metahuman powers upon them.</p>
                <p>No one knows what the "worthiness metrics" entail, or whether the Bequest Mechanism is malfunctioning after its violent landing. What is certain, however, is that the number of superpowered individuals in the world has skyrocketed, relatively speaking, since the Mechanism was released. These new superpowers seem to have nothing to do with mysticism or the collective unconscious, but are classified instead as Cosmic Metahuman powers.</p>
            </section>
            <section>
                <h3>Technology: Cutting-Edge Super-Science</h3>
                <p>In any period of history, technology that is sufficiently avant garde can be considered a superpower, and this era is certainly no exception.</p>
            </section>
        </div>
    ];

    return (
        <div className="landing-envelope">
            <section className="landing">
                <section className="introduction">
                    <h2>Introduction</h2>
                    <p>The Sila-Verse is a setting for the <em>Mutants and Masterminds 3rd Edition Roleplaying Game</em> by <a href="https://greenronin.com/" target="_blank">Green Ronin</a>. It is set in a near-future version of Earth, and is designed to accommodate series with a wide variety of Power Levels.</p>
                    <p>There are plenty of PC-worthy builds provided in this setting, but there is also space for your players to come up with their own PC concepts. Feel free to add to or modify this material if using it to run a series of your own.</p>
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
                    <Accordion allowMultipleOpen>
                        {settingDesc}
                    </Accordion>
                </section>
            </section>
        </div>
    )
}

export default Landing;