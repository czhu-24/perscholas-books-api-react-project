import { combineReducers } from "redux";
import hasKeyReducer from "./slices/hasKeySlice";
import keyReducer from "./slices/keySlice";
import currentListsReducer from "./slices/currentListsSlice";
import currentDateReducer from "./slices/currentDateSlice";
import searchReducer from "./slices/searchSlice";
import searchResultsReducer from "./slices/searchResultsSlice";

const rootReducer = combineReducers({
	hasKey: hasKeyReducer,
	key: keyReducer,
	currentLists: currentListsReducer,
	currentDate: currentDateReducer,
	search: searchReducer,
	searchResults: searchResultsReducer
})

export default rootReducer;