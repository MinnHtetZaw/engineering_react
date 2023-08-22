import { createSlice } from "@reduxjs/toolkit";

const issueSlice = createSlice({
    name: "issue",
    initialState: {
        issueList:[],
    },
    reducers: {
        addIssue: (state, action) => {
        
            action.payload.issue['contact_person']=action.payload.contact_person;
            state.issueList.push(action.payload.issue);
            
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