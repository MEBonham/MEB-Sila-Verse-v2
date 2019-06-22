export const sortByName = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    } else if (nameA > nameB) {
        return 1;
    } else {
        return 0;
    }
}

export const sortByNameAndTitle = (a, b) => {
    const nameA = a.nameAndTitle.toUpperCase();
    const nameB = b.nameAndTitle.toUpperCase();
    if (nameA < nameB) {
        return -1;
    } else if (nameA > nameB) {
        return 1;
    } else {
        return 0;
    }
}

export const sortByNumber = (a, b) => {
    if (isNaN(a)) {
        return -1;
    } else if (isNaN(b)) {
        return 1;
    } else {
        return Number(a) - Number(b);
    }
}

export const allHaveTheSameVal = (arrOfHeroes, abbr) => {
    const eff = arrOfHeroes[0].abilities[abbr].eff;
    for (let i = 1; i < arrOfHeroes.length; i++) {
        if (arrOfHeroes[i].abilities[abbr].eff !== eff) {
            return false;
        }
    }
    return true;
}