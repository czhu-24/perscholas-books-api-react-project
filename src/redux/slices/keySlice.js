import { createSlice } from "@reduxjs/toolkit";

const keySlice = createSlice({
	name: 'key',
	initialState: { 
		key: ''
	},
	reducers: {
		setKey: (state, action) => {
			state.key = action.payload;
		},
	},

});

export const {setKey} = keySlice.actions;

export default keySlice.reducer;