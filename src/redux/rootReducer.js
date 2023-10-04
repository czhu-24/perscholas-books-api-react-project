import { combineReducers } from "redux";
import hasKeyReducer from "./slices/hasKeySlice";
import keyReducer from "./slices/keySlice";
import currentListsReducer from "./slices/currentListsSlice";
import currentDateReducer from "./slices/currentDateSlice";

const rootReducer = combineReducers({
	hasKey: hasKeyReducer,
	key: keyReducer,
	currentLists: currentListsReducer,
	currentDate: currentDateReducer
})

export default rootReducer;