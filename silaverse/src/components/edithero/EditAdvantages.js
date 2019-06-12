import React, { useEffect, useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import EditMultiformContext from '../../hooks/EditMultiformContext';

import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu from './HTMLHelpContextMenu';

const EditAdvantages = () => {

    const { inputs, setInputs, handleInputChange, advantagesInfo } = useContext(EditMultiformContext);
    const advantagesRef = useRef(null);
    const equipmentRef = useRef(null);
    const languagesRef = useRef(null);

    useEffect(() => {
        if (advantagesInfo) {
            setInputs(inputs => ({
                ...inputs,
                totalAdvantagesCost: advantagesInfo.totalAdvantagesCost,
                advantagesList: advantagesInfo.advantagesList,
                totalEquipmentCost: advantagesInfo.totalEquipmentCost,
                equipmentInfo: advantagesInfo.equipmentInfo,
                languagesInfo: advantagesInfo.languagesInfo
            }));
        }
    }, [ advantagesInfo ]);

    return(
        <section className="advantages">
            <h2 id="advantages-section">Advantages</h2>
            <label htmlFor="totalAdvantagesCost">Total Cost of Advantages</label>
            <input
                type="number"
                id="totalAdvantagesCost"
                onChange={handleInputChange}
                value={inputs.totalAdvantagesCost || 0}
            />
            <div className="textarea">
                <label htmlFor={`advantagesList`}>List of Advantages (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`advantagesList`}
                        onChange={handleInputChange}
                        value={inputs.advantagesList || ""}
                        placeholder="Accurate Attack"
                        rows="6"
                        cols="70"
                        ref={advantagesRef}
                    />
                    <MenuProvider id={`htmlHelp-advantagesList`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu menuId={`htmlHelp-advantagesList`} input={`advantagesList`} refProp={advantagesRef} />
                </div>
            </div>
            <label htmlFor="totalEquipmentCost">Total Equipment Points (ep)</label>
            <input
                type="number"
                id="totalEquipmentCost"
                onChange={handleInputChange}
                value={inputs.totalEquipmentCost || 0}
            />
            <div className="textarea">
                <label htmlFor={`equipmentInfo`}>Equipment Information (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`equipmentInfo`}
                        onChange={handleInputChange}
                        value={inputs.equipmentInfo || ""}
                        placeholder={`<ul><li><strong>Commlink &middot;</strong> <span class="lesser-note">1 ep</span><li></ul>`}
                        rows="6"
                        cols="70"
                        ref={equipmentRef}
                    />
                    <MenuProvider id={`htmlHelp-equipmentInfo`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu menuId={`htmlHelp-equipmentInfo`} input={`equipmentInfo`} refProp={equipmentRef} />
                </div>
            </div>
            <div className="textarea">
                <label htmlFor={`languagesInfo`}>Languages (can include HTML)</label>
                <div className="sub-textarea">
                    <textarea
                        id={`languagesInfo`}
                        onChange={handleInputChange}
                        value={inputs.languagesInfo || ""}
                        placeholder={`<strong>&middot;</strong> native: <strong>English &middot;</strong>`}
                        rows="6"
                        cols="70"
                        ref={languagesRef}
                    />
                    <MenuProvider id={`htmlHelp-languagesInfo`}>
                        <img
                            src={goldStar}
                            alt="HTML-help Menu"
                            className="star-menu"
                        />
                    </MenuProvider>
                    <HTMLHelpContextMenu menuId={`htmlHelp-languagesInfo`} input={`languagesInfo`} refProp={languagesRef} />
                </div>
            </div>
        </section>
    );
}

export default EditAdvantages;