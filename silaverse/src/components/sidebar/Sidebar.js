import React, { useState, useEffect, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';

import firebase from '../../fbConfig';

import Accordion from './Accordion';
import HeroListing from './HeroListing';

import '../../css/Sidebar.css';

const Sidebar = props => {

    // console.log(props);
    const db = firebase.db;

    const [ heroes ] = useGlobal('heroes');
    const [ user ] = useGlobal('user');
    // const heroList = heroes ?
    //     heroes.map(hero => {
    //         return (<HeroListing key={hero.id} id={hero.id} urlid={hero.urlid} name={hero.name} history={props.history} />)
    //     }) :
    //     "";

    const [ orgObject, setOrgObject ] = useState({});
    const [ coveredHeroes, setCoveredHeroes ] = useState([]);
    const [ heroTree, setHeroTree ] = useState([]);
    useEffect(() => {
        db.collection("folders").orderBy("orderNum")
            .get()
            .then(querySnapshot => {
                let tempOrgObject = {};
                querySnapshot.forEach(doc => {
                    tempOrgObject = {
                        ...tempOrgObject,
                        [doc.id]: doc.data()
                    };
                });
                setOrgObject(tempOrgObject);
            })
            .catch(err => {
                console.log("Error initializing folders in Sidebar:", err);
            });
    }, []);

    useEffect(() => {
        let arr = [];
        Object.keys(orgObject).forEach(folderName => {
            arr = [
                ...arr,
                ...JSON.parse(orgObject[folderName].heroes)
            ];
        })
        setCoveredHeroes(arr);
    }, [ orgObject ]);

    useEffect(() => {
        if (heroes) {
            const tempHeroTree = Object.keys(orgObject).map(folderName => (
                <div key={folderName} label={folderName}>
                    {JSON.parse(orgObject[folderName].heroes).map(heroId => {
                        const thisHero = heroes.filter(hero => hero.id === heroId)[0];
                        const subHero = (thisHero.subHero && thisHero.subHero.length);
                        return(<HeroListing
                            key={heroId}
                            id={heroId}
                            urlid={thisHero.urlid}
                            name={thisHero.name}
                            subhero={subHero}
                            history={props.history}
                        />);
                    })}
                </div>
            ));
            if (heroes.length > coveredHeroes.length) {
                tempHeroTree.push(
                    <div key="uncategorized" label="Uncategorized">
                        {heroes.filter(hero => (!coveredHeroes.includes(hero.id))).map(thisHero => {
                            const subHero = (thisHero.subHero && thisHero.subHero.length);
                            return(<HeroListing
                                key={thisHero.id}
                                id={thisHero.id}
                                urlid={thisHero.urlid}
                                name={thisHero.name}
                                subhero={subHero}
                                history={props.history} />
                            );
                        })}
                    </div>
                );
            }
            setHeroTree(tempHeroTree);
        }
    }, [ heroes, coveredHeroes ]);

    return(
        <section className="full-sidebar">
            {user ? <Link to="/newhero">New Hero</Link> : null}
            {user ? <Link to="/organize">Organize Heroes</Link> : null}
            <Link to="/analysis">Analyze Setting</Link>
            <Link to="/worldmap">World Map</Link>
            <Accordion allowMultipleOpen>
                {heroTree}
            </Accordion>
        </section>
    );
}

export default Sidebar;