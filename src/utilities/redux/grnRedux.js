import { createSlice } from "@reduxjs/toolkit";

const grnSlice = createSlice({
    name: "grn",
    initialState: {
      grn_item: [],
      grn_temp_id: 0,
      grn_total: 0,
      edit : 0,
      newspec : '',
    },
    reducers: {
        addGRNItemData: (state, action) => {
            console.log(action.payload);
           state.grn_item.push(action.payload);
           state.grn_total += action.payload.stock_qty;
          state.grn_temp_id += action.payload.grn_temp_id;
        },
        removeProduct: (state, action) => {
            
          for (var i = 0; i < state.grn_item.length; i++) {
            if (state.grn_item[i].grn_temp_id === action.payload) {
                state.grn_total = state.grn_total - state.grn_item[i].stock_qty;
                state.grn_item.splice(i, 1);    
               
            }
          }
        },
        resetProduct: (state) => {
          state.grn_item.length = 0; 
        }
    }
})

export const{addGRNItemData,removeProduct,resetProduct} = grnSlice.actions
export default grnSlice.reducer;