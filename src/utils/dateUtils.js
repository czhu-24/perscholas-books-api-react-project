export const generateFormattedDateFromObject = (dateObj) => {
	// FROM OBJECT
	// date is an object with keys: year, month, date & all values are numbers
	return `${dateObj.year}-${dateObj.month.toString().padStart(2, '0')}-${dateObj.date.toString().padStart(2, '0')}`;
}

export const generateMonthName = (monthNumber) => {
	const monthNames = [
		"January", "February", "March", "April",
		"May", "June", "July", "August",
		"September", "October", "November", "December"
	  ];

	return monthNames[monthNumber - 1];
}

export const generateFormattedDateFromRawDate = (dateObj) => {
	// date is also an object 
	return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
}

export const generateFormattedDateWeekAway = (dateString, isForward) => {
	// TODO: return current date if going too far back & too far into future
	const [year, month, date] = dateString.split('-').map(Number);
	const dateObject = new Date(year, month - 1, date);
	const multiplier = isForward ? 1 : -1;

	const aWeekAway = new Date(dateObject.getTime() + (7 * 24 * 60 * 60 * 1000) * multiplier);

	return generateFormattedDateFromRawDate(aWeekAway);
}