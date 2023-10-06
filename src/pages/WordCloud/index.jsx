import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactWordCloud from 'react-d3-cloud'
import { generateMonthName } from '../../utils/dateUtils'
import DatePicker from '../../components/DatePicker'

const WordCloud = () => {

	// TODO: add Datepicker
	// remove any characters that are not alphabetical characters
	// toggle between all words for that list for that week & the top... 50?
	// on hover, show the count for that word

	const [isLoading, setIsLoading] = useState(true);

	const date = useSelector((store) => store.currentDate);

	const requestCounter = 0;

	const currentLists = useSelector((store) => store.currentLists);

	let dataObject = {};
	let dataArray = [];

	useEffect(() => {
		const fillerWords = ["the", "and", "of", "a", "to", "in", "on", "an", "with", "i", "you", "me", "us"];

		currentLists.forEach((list) =>
			list.books.forEach((book) => { // Remove .title from here
				book.title.split(" ").forEach((word) => {
					if (!fillerWords.includes(word.toLowerCase()) && word in dataObject) {
						dataObject[word]++;
					} else if (!fillerWords.includes(word.toLowerCase()) && !(word in dataObject)) {
						dataObject[word] = 1;
					}
				});
			})
		);

		//console.log(JSON.stringify(dataObject));

		// now turn obj like {word1: val1, word2: val2...} into [{text: word1, value: val1}, {value: word2, value: val2}]
		for (let key in dataObject) {
			dataArray.push({
				text: key,
				value: dataObject[key] * 50
			})
		}

		// need to sort by value inside every object AND THEN, take only the top 25 words

		dataArray.sort((a, b) => b.value - a.value);

		dataArray = dataArray.slice(0, 50);
		setIsLoading(false);
	}, [date, currentLists]);

	console.log(dataArray);

	return (
		<>
			<h1>WordCloud for Titles for All Lists for {`${generateMonthName(date.month)}, ${date.date}, ${date.year}`}</h1>
			<DatePicker requestCounter={requestCounter} />
			{!isLoading ? (
				<ReactWordCloud data={dataArray} padding={0} width={500} height={500} />
			) : (
				<p>Loading...</p>
			)}
		</>
	)
}

export default WordCloud