import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
	reducer: {
		hasKey: hasKeyReducer
	}

});

export default store;