import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
    name: "route",
    initialState: {
        url: 'http://localhost:8000/api/'
    },
    reducers: {
        
    }
})

export const {} = routeSlice.actions
export default routeSlice.reducer;