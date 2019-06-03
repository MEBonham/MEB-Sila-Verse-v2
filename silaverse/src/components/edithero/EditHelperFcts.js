export const inputsToStateFlow = (inputs) => {
    const powersCopy = [];
    for (let i = 0; i < inputs.powerCount; i++) {
        powersCopy.push({
            name: inputs[`power-${i}-name`],
            device: inputs[`power-${i}-device`],
            cost: inputs[`power-${i}-cost`],
            desc: inputs[`power-${i}-desc`],
            details: inputs[`power-${i}-details`],
        });
    }
    return powersCopy;
}

export const stateToInputsFlow = (stateArray, inputs) => {
    const inputsCopy = JSON.parse(JSON.stringify(inputs));
    for (let i = 0; i < stateArray.length; i++) {
        Object.keys(stateArray[i]).forEach(key => {
            const str = `power-${i}-${key}`;
            inputsCopy[str] = stateArray[i][key];
        })
    }
    [ 'name', 'device', 'cost', 'dexc', 'details' ].forEach(key => {
        const str = `power-${stateArray.length}-${key}`;
        delete inputsCopy[str];
    })
    return inputsCopy;
}

export const packageHeroForDB = (inputs) => {
    const powersArray = inputsToStateFlow(inputs);
    return {
        urlid: inputs.urlid,
        name: inputs.name,
        identity: inputs.identity,
        heroType: inputs.heroType,
        powerLevel: inputs.powerLevel,
        abilities: JSON.stringify({
            str: {
                base: inputs.baseStr,
                eff: inputs.effStr
            },
            sta: {
                base: inputs.baseSta,
                eff: inputs.effSta
            },
            agl: {
                base: inputs.baseAgl,
                eff: inputs.effAgl
            },
            dex: {
                base: inputs.baseDex,
                eff: inputs.effDex
            },
            fgt: {
                base: inputs.baseFgt,
                eff: inputs.effFgt
            },
            int: {
                base: inputs.baseInt,
                eff: inputs.effInt
            },
            awe: {
                base: inputs.baseAwe,
                eff: inputs.effAwe
            },
            pre: {
                base: inputs.basePre,
                eff: inputs.effPre
            },
            note: inputs.abilitiesNote
        }),
        totalPowersCost: inputs.totalPowersCost,
        powers: JSON.stringify(powersArray),
        totalAdvantagesCost: inputs.totalAdvantagesCost,
        advantagesList: inputs.advantagesList,
        totalEquipmentCost: inputs.totalEquipmentCost,
        equipmentInfo: inputs.equipmentInfo,
        languages: inputs.languagesInfo
    }
};

export const packageHeroForGlobal = (heroId, heroDbVersion) => {
    const formattedAbilities = JSON.parse(heroDbVersion.abilities);
    const formattedPowers = JSON.parse(heroDbVersion.powers);
    return {
        ...heroDbVersion,
        abilities: formattedAbilities,
        powers: formattedPowers,
        id: heroId
    };
}

export const fixBlankInputFields = (inputs) => {
    const fixedInputs = { ...inputs };
    if (!inputs.identity) {
        fixedInputs.identity = "";
    }
    if (!inputs.heroType) {
        fixedInputs.heroType = "";
    }
    if (inputs.powerLevel === undefined) {
        fixedInputs.powerLevel = 10;
    }
    if (!inputs.abilitiesNote) {
        fixedInputs.abilitiesNote = "";
    }
    if (!inputs.totalPowersCost) {
        fixedInputs.totalPowersCost = 0;
    }
    for (let i = 0; i < inputs.powerCount; i++) {
        if (inputs[`power-${i}-device`] === undefined) {
            fixedInputs[`power-${i}-device`] = false;
        }
    }
    if (!inputs.totalAdvantagesCost) {
        fixedInputs.totalAdvantagesCost = 0;
    }
    if (!inputs.advantagesList) {
        fixedInputs.advantagesList = "";
    }
    if (!inputs.totalEquipmentCost) {
        fixedInputs.totalEquipmentCost = 0;
    }
    if (!inputs.equipmentInfo) {
        fixedInputs.equipmentInfo = "";
    }
    if (!inputs.languagesInfo) {
        fixedInputs.languagesInfo = "";
    }
    return fixedInputs;
}