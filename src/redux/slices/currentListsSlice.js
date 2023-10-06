// slice to hold all the lists for current week

import { createSlice } from "@reduxjs/toolkit";

const currentListsSlice = createSlice({
	name: "currentLists",
	initialState: [],
	reducers: {
		setCurrentLists: (state, action) => {
			return [...action.payload];
		}
	}
});

export const {setCurrentLists} = currentListsSlice.actions;

export default currentListsSlice.reducer;
