import React from 'reactn';

const WorldMap = () => {
    return(
        <div className="world-map">
            <h1>Map of the Sila-Verse</h1>
            <iframe title="sila-verse-map" width="100%" height="400px" src="https://maphub.net/embed/60369?panel=1&tablinks=1" frameborder="0"></iframe>
        </div>
    );
}

export default WorldMap;