import { createSlice } from "@reduxjs/toolkit";

const bomSlice = createSlice({
    name: "bom",
    initialState: {
      products : [],
      isShow : false,
      edit : 0,
      newspec : '',
    },
    reducers: {
        addProduct: (state, action) => {
       
           state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
          for (var i = 0; i < state.products.length; i++) {
            if (state.products[i].product_id === action.payload.id) {
                state.products.splice(i, 1);
            }
          }
        },
        resetProduct: (state) => {
          state.products.length = 0; 
        },
        changeStatus: (state) =>{
          state.isShow = !state.isShow;
        },
        changeEdit: (state,action) =>{
          state.edit = 1;
          state.newspec = action.payload.spec;
        },
        changeEdited: (state,action) =>{
          state.edit = 0;
          state.newspec = '';
        },
    }
})

export const{addProduct,removeProduct,resetProduct,changeStatus, changeEdit, changeEdited} = bomSlice.actions
export default bomSlice.reducer;