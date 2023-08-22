import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogin : false,
        user : {},
       
    },
    reducers: {
     
    storeUser:(state,action)=> {
      
        state.user = action.payload
        state.isLogin = true
    },

    LogoutProcess:(state)=>{
        state.isLogin = false
        state.user = ''
        
    }
      
    }
})

export const{storeUser,LogoutProcess} = userSlice.actions
export default userSlice.reducer;