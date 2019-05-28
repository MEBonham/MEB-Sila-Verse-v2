export const packageHeroForDB = inputs => ({
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
    })
});

export const packageHeroForGlobal = (heroId, heroDbVersion) => {
    const formattedAbilities = JSON.parse(heroDbVersion.abilities);
    return {
        ...heroDbVersion,
        abilities: formattedAbilities,
        id: heroId
    };
}

export const fixBlankInputFields = inputs => {
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
    return fixedInputs;
}