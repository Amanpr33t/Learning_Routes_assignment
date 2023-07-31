import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterData: {
        courseType: null, duration: null, feesMin: null, feesMax: null, field: null
    }
}

const FilterDataSlice = createSlice({
    name: 'FilterData',
    initialState: initialState,
    reducers: {
        setFilterData(state, action) {
            state.filterData = action.payload
        }
    }
})

export default FilterDataSlice
export const FilterDataActions = FilterDataSlice.actions