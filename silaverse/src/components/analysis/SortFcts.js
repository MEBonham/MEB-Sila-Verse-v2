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

export const sortByNumber = (a, b) => {
    if (isNaN(a)) {
        return -1;
    } else if (isNaN(b)) {
        return 1;
    } else {
        return Number(a) - Number(b);
    }
}