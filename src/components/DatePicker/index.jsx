import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { generateFormattedDateFromObject, generateFormattedDateFromRawDate, generateFormattedDateWeekAway } from '../../utils/dateUtils';
import { setCurrentDate } from '../../redux/slices/currentDateSlice';
import axios from 'axios';
import { setCurrentLists } from '../../redux/slices/currentListsSlice';

const DatePicker = ({ requestCounter }) => {
	const dispatch = useDispatch();
	// Initialize state to store the formatted date string

	const [warning, setWarning] = useState(true);

	const date = useSelector((store) => store.currentDate);
	const [displayedDate, setDisplayedDate] = useState(generateFormattedDateFromObject(date));

	const formattedDate = generateFormattedDateFromObject(date);
	const fetchNYTimesData = () => {
		const nyKey = "gNiB3j1UoXh6bjDSRLuVQhAWbytpAwbu";

		const nyTimesURL = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${formattedDate}&api-key=${nyKey}`;

		axios.get(nyTimesURL) // returns a Promise
			.then((response) => {  // happens when promise is resolved
				dispatch(setCurrentLists(response.data.results.lists));
				setWarning(false);
			})
			.catch((err) => {
				console.log("Error fetching data from NYTimes", err);
				setWarning(true);
			})
	}

	useEffect(() => {
		// Start the throttled API call when the component mounts
		//const intervalId = throttledFetchNYTimesData2();

		// Clear the interval when the component unmounts or when the date changes
		//return () => clearInterval(intervalId);

		fetchNYTimesData();
	}, [date]);


	const handleDateChange = (e) => {
		if (requestCounter > 5) {
			return;
		}
		// Update the local state
		setDisplayedDate(e.target.value);

		// Dispatch the action to update the Redux store
		// we're separating out the displayed date & the value in the store
		// because we don't want infinite renders
		dispatch(setCurrentDate(e.target.value));
	}

	const goOneWeekAway = (isForward) => {
		if (requestCounter > 5) {
			return;
		}
		// bool is true if you're going forward a week
		console.log(displayedDate, isForward);
		const newDate = generateFormattedDateWeekAway(displayedDate, isForward);

		setDisplayedDate(newDate);
		dispatch(setCurrentDate(newDate));
	}

	return (
		<div className="dateFlex">
			<button onClick={() => goOneWeekAway(false)}>&lt;-</button>
			<input
				type="date"
				name="date"
				id="date"
				value={displayedDate}
				onChange={(e) => handleDateChange(e)}
				min="2010-01-01"
				max={generateFormattedDateFromRawDate(new Date())}
			/>
			<button onClick={() => goOneWeekAway(true)}>-&gt;</button>
			{warning && <div>TOO MANY REQUESTS</div>}
		</div>
	)
}

export default DatePicker