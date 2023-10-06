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

		const [year, month, date] = action.payload.split('-');
		// YYYY-MM-DD
		if(state.year != year || state.month != month || state.date != date){
			return {
				year, month, date
			};
		}else{
			return state;
		}

		
	  },
	},
  });

export const {setCurrentDate} = currentDateSlice.actions;

export default currentDateSlice.reducer;