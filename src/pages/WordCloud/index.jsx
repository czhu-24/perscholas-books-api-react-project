import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactWordCloud from 'react-d3-cloud'
import { generateMonthName } from '../../utils/dateUtils'
import DatePicker from '../../components/DatePicker'

const WordCloud = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [dataArray, setDataArray] = useState([]);

	const date = useSelector((store) => store.currentDate);

	const requestCounter = 0;

	const currentLists = useSelector((store) => store.currentLists);

	let dataObject = {};

	const fillerWords = ["the", "and", "of", "a", "to", "in", "on", "an", "with", "i", "you", "me", "us"];

	useEffect(() => {
		currentLists.forEach((list) =>
			list.books.forEach((book) => { // Remove .title from here
				book.title.split(" ").forEach((word) => {
					// keep only alphabetic characters
					const filteredWord = word.replace(/[^a-zA-Z]/g, '');
					if (!fillerWords.includes(word.toLowerCase()) && word in dataObject) {
						dataObject[filteredWord]++;
					} else if (!fillerWords.includes(word.toLowerCase()) && !(word in dataObject)) {
						dataObject[filteredWord] = 1;
					}
				});
			})
		);

		let tempArray = [];

		console.log(dataObject);

		// now turn obj like {word1: val1, word2: val2...} into [{text: word1, value: val1}, {value: word2, value: val2}]
		for (let key in dataObject) {
			console.log(dataObject[key] * 50);
			tempArray.push({
				text: key,
				value: dataObject[key] * 50
			})
		}


		// need to sort by value inside every object AND THEN, take only the top 25 words

		tempArray.sort((a, b) => b.value - a.value);
		console.log({ tempArray });
		tempArray = tempArray.slice(0, 50);

		setDataArray(tempArray);

		setIsLoading(false);
	}, [date, currentLists])

	return (
		<>
			<h1>WordCloud for Titles for All Lists for {`${generateMonthName(date.month)}, ${date.date}, ${date.year}`}</h1>
			<DatePicker requestCounter={requestCounter} />
			{isLoading ? (
				<h1>Loading... </h1>
			) : (
				<ReactWordCloud data={dataArray} />
			)}
		</>
	)
}

export default WordCloud