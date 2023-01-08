const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const daysOfMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const randomDate = () => {
    const month = randomInteger(6, 12);
    const year = 2022;
    const day = randomInteger(1, daysOfMonth(month, year));
    return `${month}/${day}/${year}`;
}

console.log(randomDate())