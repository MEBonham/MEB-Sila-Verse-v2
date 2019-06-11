import React from 'reactn';

import firebase from '../../fbConfig';

import useForm from '../../hooks/useForm';

const HeroWithFolderDropdown = props => {

    const db = firebase.db;
    const { inputs, handleInputChange } = useForm();

    const selectFolder = ev => {
        handleInputChange(ev);
        if (ev.target.value === "uncategorized") {
        
        } else {
            db.collection("folders").doc(ev.target.value)
                .get()
                .then(doc => {
                    const heroArr = JSON.parse(doc.data().heroes);
                    heroArr.push(props.id);
                    db.collection("folders").doc(ev.target.value)
                        .set({
                            heroes: JSON.stringify(heroArr)
                        })
                        .then(() => {
                            props.setRefreshFlag(props.refreshFlag + 1);
                        })
                        .catch(err => {
                            console.log("Error updating target folder to include new hero:", err);
                        });
                })
                .catch(err => {
                    console.log(`Error finding db folder matching ${ev.target.value}:`, err);
                });
        }
    }

    return (
        <li>
            <span>{props.name}</span>
            <select
                value={inputs[`hero-category-dropdown-${props.id}`] || props.prevFolder}
                id={`hero-category-dropdown-${props.id}`}
                onChange={selectFolder}
            >
                <option value="uncategorized">Uncategorized</option>
                {props.folders.map(folderName => (
                    <option key={folderName} value={folderName}>{folderName}</option>
                ))}
            </select>
        </li>
    );
}

export default HeroWithFolderDropdown;