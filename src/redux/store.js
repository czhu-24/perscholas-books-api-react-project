import { configureStore } from "@reduxjs/toolkit";
import hasKeyReducer from "./slices/hasKeySlice";



const store = configureStore({
	reducer: {
		hasKey: hasKeyReducer
	}

});

export default store;