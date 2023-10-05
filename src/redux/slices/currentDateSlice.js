import { createSlice} from "@reduxjs/toolkit";
import { generateFormattedDateDDMM } from "../../utils/dateUtils";

const currentDateSlice = createSlice({
	name: "currentDate",
	initialState: {
		rawDate: new Date().toISOString(),
		formattedDate: generateFormattedDateDDMM(new Date())},
	reducers: {
	  setCurrentDate: (state, action) => {
		return {
			rawDate: action.payload, 
			formattedDate: generateFormattedDateDDMM(action.payload)
		};
	  },
	},
  });

export const {setCurrentDate} = currentDateSlice.actions;

export default currentDateSlice.reducer;