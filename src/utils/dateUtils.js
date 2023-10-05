// date is a raw Date() object
export const generateFormattedDateDDMM = (date) => {
	// get date formatted like this: YYYY-DD-MM
	return `${date.getFullYear()}-${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

export const generateFormattedDateMMDD = (date) => {
	// get date formatted like this: YYYY-MM-DD
	return `${date.getFullYear()}-${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

export const getFormattedMonth = (date) => {
	// 0 becomes Jan... 11 becomes Dec, etc
	return date.toLocaleString('default', { month: 'long' })
};