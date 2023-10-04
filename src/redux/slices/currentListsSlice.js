// slice to hold all the lists for current week

import { createSlice } from "@reduxjs/toolkit";

const currentListsSlice = createSlice({
	name: "currentLists",
	initialState: [],
	reducers: {
		addCurrentLists: (state, action) => {
			state.push(...action.payload);
		}
	}
});

export const {addCurrentLists} = currentListsSlice.actions;

export default currentListsSlice.reducer;