import React, { useGlobal } from 'reactn';

const CharSheet = props => {

    const urlid = props.match.params.id;
    const [ heroes ] = useGlobal('heroes');
    const filteredHeroes = heroes ?
        heroes.filter(hero => hero.urlid === urlid) :
        [];

    if (filteredHeroes.length) {
        const thisHero = filteredHeroes[0];
        return(
            <section className="char-sheet">
                <header>
                    <h1>{thisHero.name}</h1>
                    <h2>{thisHero.identity}</h2>
                    <p className="hero-type">{thisHero.heroType}</p>
                    <p className="last-header-line">Power Level {thisHero.powerLevel}</p>
                </header>
            </section>
        );
    } else {
        return(<section></section>)
    }
}

export default CharSheet;