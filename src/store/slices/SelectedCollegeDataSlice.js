import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   selectedCollegeData:null
}

const SelectedCollegeDataSlice = createSlice({
    name: 'SelectedCollegeData',
    initialState: initialState,
    reducers: {
        setSelectedCollegeData(state, action) {
            state.selectedCollegeData=action.payload
        }
    }
})

export default SelectedCollegeDataSlice
export const SelectedCollegeDataActions = SelectedCollegeDataSlice.actions