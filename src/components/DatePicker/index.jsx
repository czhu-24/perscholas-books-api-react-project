import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { generateFormattedDateFromObject, generateFormattedDateFromRawDate, generateFormattedDateWeekAway } from '../../utils/dateUtils';
import { setCurrentDate } from '../../redux/slices/currentDateSlice';

const DatePicker = ({ date, requestCounter}) => {
	const dispatch = useDispatch();



	// Initialize state to store the formatted date string
	const [displayedDate, setDisplayedDate] = useState(generateFormattedDateFromObject(date));

	const handleDateChange = (e) => {
		if(requestCounter >= 4){
			return;
		}
		// Update the local state
		setDisplayedDate(e.target.value);

		// Dispatch the action to update the Redux store
		// we're separating out the displayed date & the value stored in redux
		// because we don't want infinite renders
		dispatch(setCurrentDate(e.target.value));
	}

	const goOneWeekAway = (boolean) => {
		if(requestCounter >= 4){
			return;
		}
		// bool is true if you're going forward a week
		console.log(displayedDate, boolean);
		const newDate = generateFormattedDateWeekAway(displayedDate, boolean);

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

		</div>
	)
}

export default DatePicker