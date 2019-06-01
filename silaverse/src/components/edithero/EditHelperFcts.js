// export const inputsToStateFlow = (inputs, powerCount) => {
export const inputsToStateFlow = (inputs) => {
    const powersCopy = [];
    console.log(inputs);
    for (let i = 0; i < inputs.powerCount; i++) {
        powersCopy.push({
            name: inputs[`power-${i}-name`],
            device: inputs[`power-${i}-device`],
            cost: inputs[`power-${i}-cost`],
            desc: inputs[`power-${i}-desc`],
            details: inputs[`power-${i}-details`],
        });
    }
    console.log(JSON.stringify(powersCopy));
    return powersCopy;
}

export const stateToInputsFlow = (stateArray, inputs) => {
    const inputsCopy = JSON.parse(JSON.stringify(inputs));
    // inputsCopy.totalPowersCost = totalPowersCost;
    console.log(stateArray);
    for (let i = 0; i < stateArray.length; i++) {
        Object.keys(stateArray[i]).forEach(key => {
            const str = `power-${i}-${key}`;
            inputsCopy[str] = stateArray[i][key];
        })
    }
    return inputsCopy;
}

// export const packageHeroForDB = (inputs, powerCount) => {
export const packageHeroForDB = (inputs) => {
    // const powersArray = inputsToStateFlow(inputs, powerCount);
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
        advantagesList: inputs.advantagesList
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

// export const fixBlankInputFields = (inputs, powerCount) => {
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
    return fixedInputs;
}