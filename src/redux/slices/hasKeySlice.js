import { createSlice } from "@reduxjs/toolkit";


const hasKeySlice = createSlice({
	name: "hasKey",
	initialState: false,
	reducers: {
		enteredKey: () => true,
	}
});

export const {enteredKey, enteredWrongKey} = hasKeySlice.actions;

export default hasKeySlice.reducer;