import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        role : "warehouse"
    },
    // reducers: {
      
      
    // }
})

// export const{addAccount,addAccountOne, resetAccount} = userSlice.actions
export default userSlice.reducer;