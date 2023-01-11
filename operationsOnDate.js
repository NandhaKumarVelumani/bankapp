const calcDayspassed = (date1, date2) =>
	Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

const daysPassed = calcDayspassed(new Date(2021, 5, 1), new Date(2021, 5, 10));
console.log(daysPassed);
