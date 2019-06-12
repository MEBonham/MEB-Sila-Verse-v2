import React, { useContext, useRef } from 'reactn';
import { MenuProvider } from 'react-contexify';

import NewMultiformContext from '../../hooks/NewMultiformContext';

import goldStar from '../../images/gold-star.png';

import HTMLHelpContextMenu2 from './HTMLHelpContextMenu2';

const NewAdvantages = () => {

    const { inputs, handleInputChange } = useContext(NewMultiformContext);
    const advantagesRef = useRef(null);
    const equipmentRef = useRef(null);
    const languagesRef = useRef(null);

    return(
        <section className="advantages">
            <h2>Advantages</h2>
            <label htmlFor="totalPowersCost">Total Cost of Advantages</label>
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
                    <HTMLHelpContextMenu2 menuId={`htmlHelp-advantagesList`} input={`advantagesList`} refProp={advantagesRef} />
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
                    <HTMLHelpContextMenu2 menuId={`htmlHelp-equipmentInfo`} input={`equipmentInfo`} refProp={equipmentRef} />
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
                    <HTMLHelpContextMenu2 menuId={`htmlHelp-languagesInfo`} input={`languagesInfo`} refProp={languagesRef} />
                </div>
            </div>
        </section>
    );
}

export default NewAdvantages;