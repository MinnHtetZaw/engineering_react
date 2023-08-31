import { createSlice } from "@reduxjs/toolkit";

const issueSlice = createSlice({
    name: "issue",
    initialState: {
        issueList:[],
    },
    reducers: {
        addIssue: (state, action) => {

            state.issueList.push(action.payload);
       
        },
        removeIssue: (state, action) => {

            state.issueList.splice(action.payload,1);
      
        },
        resetIssue: (state) => {
          state.issueList.length = 0; 
        }
    }
})

export const{addIssue,removeIssue,resetIssue} = issueSlice.actions
export default issueSlice.reducer;