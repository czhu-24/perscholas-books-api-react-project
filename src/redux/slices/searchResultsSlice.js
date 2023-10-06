import { createSlice } from "@reduxjs/toolkit";

const searchResultsSlice = createSlice({
    name: "searchResults",
    initialState: [], 
    reducers: {
        setSearchResults: (state,action) => {
            return [...action.payload];
        }
    }
})

export const {setSearchResults} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;