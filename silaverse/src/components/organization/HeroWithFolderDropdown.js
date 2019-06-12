import React from 'reactn';

import firebase from '../../fbConfig';

import upArrow from '../../images/up-arrow.png';
import downArrow from '../../images/down-arrow.png';

import useForm from '../../hooks/useForm';

const HeroWithFolderDropdown = props => {

    const db = firebase.db;
    const { inputs, handleInputChange } = useForm();

    const removeFromPrev = (id, prevFolder) => {
        db.collection("folders").doc(prevFolder)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const heroArr = JSON.parse(doc.data().heroes);
                    const index = heroArr.indexOf(id);
                    if (index > -1) {
                        heroArr.splice(index, 1);
                    }
                    db.collection("folders").doc(prevFolder)
                        .set({
                            heroes: JSON.stringify(heroArr)
                        })
                        .then(() => {
                            props.setRefreshFlag(props.refreshFlag + 1);
                        })
                        .catch(err => {
                            console.log("Error updating old folder with removed ID:", err);
                        });
                } else {
                    props.setRefreshFlag(props.refreshFlag + 1);
                }
            })
            .catch(err => {
                console.log("Error finding old folder to delete from:", err);
            });
    }

    const selectFolder = ev => {
        handleInputChange(ev);
        if (ev.target.value === "uncategorized") {
            removeFromPrev(props.id, props.prevFolder);
        } else {
            db.collection("folders").doc(ev.target.value)
                .get()
                .then(doc => {
                    const heroArr = JSON.parse(doc.data().heroes);
                    heroArr.push(props.id);
                    db.collection("folders").doc(ev.target.value)
                        .set({
                            heroes: JSON.stringify(heroArr)
                        }, { merge: true })
                        .then(() => {
                            removeFromPrev(props.id, props.prevFolder);
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

    const moveUp = () => {
        dbOrderSwap(props.orderNum - 1, props.orderNum);
    }

    const moveDown = () => {
        dbOrderSwap(props.orderNum, props.orderNum + 1);
    }

    const dbOrderSwap = (a, b) => {
        let arr = [];
        db.collection("folders").doc(props.prevFolder)
            .get()
            .then(doc => {
                arr = JSON.parse(doc.data().heroes);
                const temp = arr[a];
                arr[a] = arr[b];
                arr[b] = temp;
                db.collection("folders").doc(props.prevFolder)
                    .set({
                        heroes: JSON.stringify(arr)
                    }, {
                        merge: true
                    })
                    .then(() => {
                        props.setRefreshFlag(props.refreshFlag + 1);
                    })
                    .catch(err => {
                        console.log("Error overwriting new order into db:", err);
                    });
            })
            .catch(err => {
                console.log("Error finding folder to modify order of:", err);
            });
    }

    return (
        <li>
            <span>{props.name}</span>
            <div className="controls">
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
                <div className="arrow-icons">
                    {(props.prevFolder !== "uncategorized") && (props.orderNum > 0) ?
                        <img src={upArrow} alt="Up Arrow" onClick={moveUp} /> :
                        null}
                    {(props.prevFolder !== "uncategorized") && (props.orderNum < props.outOf - 1) ?
                        <img src={downArrow} alt="Down Arrow" onClick={moveDown} /> :
                        null}
                </div>
            </div>
        </li>
    );
}

export default HeroWithFolderDropdown;