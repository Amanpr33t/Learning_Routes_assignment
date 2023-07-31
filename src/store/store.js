import { configureStore } from "@reduxjs/toolkit";
import BlurSlice from "./slices/BlurSlice"
import FilterDataSlice from "./slices/FilterDataSlice";
import SelectedCollegeDataSlice from "./slices/SelectedCollegeDataSlice";

const store = configureStore({
    reducer: {
        Blur: BlurSlice.reducer,
        FilterData:FilterDataSlice.reducer,
        SelectedCollegeData:SelectedCollegeDataSlice.reducer

    }
})

export default store