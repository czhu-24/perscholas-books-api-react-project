import { createSlice} from "@reduxjs/toolkit";

const currentDateSlice = createSlice({
	name: "currentDate",
	initialState: new Date(),
	reducers: {
		setCurrentDate: (state, action) => {
			return action.payload;
		}
	}
})

export const {setCurrentDate} = currentDateSlice.actions;

export default currentDateSlice.reducer;