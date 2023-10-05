import { createSlice} from "@reduxjs/toolkit";

const rawDate = new Date();

const currentDateSlice = createSlice({
	name: "currentDate",
	initialState: {
		year: rawDate.getFullYear(),
		month: rawDate.getMonth() + 1, // month is zero-indexed
		date: rawDate.getDate()
	},
	reducers: {
	  setCurrentDate: (state, action) => {
		// YYYY-MM-DD
		return {
			year: action.payload.split('-')[0],
			month: action.payload.split('-')[1],
			date: action.payload.split('-')[2]
		};
	  },
	},
  });

export const {setCurrentDate} = currentDateSlice.actions;

export default currentDateSlice.reducer;