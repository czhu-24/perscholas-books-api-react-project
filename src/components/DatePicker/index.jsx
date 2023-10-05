import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { generateFormattedDateMMDD } from '../../utils/dateUtils';
import { setCurrentDate } from '../../redux/slices/currentDateSlice';

const DatePicker = () => {
	const dispatch = useDispatch();

	const rawDate = new Date(useSelector((store) => store.currentDate.rawDate));

	// Initialize state to store the formatted date string
	const formattedDate = generateFormattedDateMMDD(rawDate);

	const [year, month, day] = formattedDate.split("-");

	return (
		<div className="dateFlex">
			<button>&lt;-</button>
			<input
				type="date"
				name="date"
				id="date"
				value={formattedDate}
				onChange={(e) => dispatch(setCurrentDate(new Date(year, month - 1, day)))}
			/>
			<button>-&gt;</button>

		</div>
	)
}

export default DatePicker