import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
       accountcoderev : '',
       accountnamerev : '',
       accountcoderec : '',
       accountnamerec : '',
       accountcodecog : '',
       accountnamecog : '',
       accountcodepay : '',
       accountnamepay : '',
    },
    reducers: {
        addAccount: (state, action) => {
          state.accountcoderev = action.payload.accountcoderev;
          state.accountnamerev = action.payload.accountnamerev;
          state.accountcoderec = action.payload.accountcoderec;
          state.accountnamerec = action.payload.accountnamerec;
        },
        addAccountOne: (state, action) => {
            state.accountcodecog = action.payload.accountcodecog;
            state.accountnamecog = action.payload.accountnamecog;
            state.accountcodepay = action.payload.accountcodepay;
            state.accountnamepay = action.payload.accountnamepay;
          },
        resetAccount: (state) => {
            state.accountcoderev ='';
            state.accountnamerev ='';
            state.accountcoderec ='';
            state.accountnamerec ='';
            state.accountcodecog ='';
            state.accountnamecog ='';
            state.accountcodepay ='';
            state.accountnamepay ='';
        }
    }
})

export const{addAccount,addAccountOne, resetAccount} = accountSlice.actions
export default accountSlice.reducer;