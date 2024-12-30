import { createSlice } from "@reduxjs/toolkit";

  const requestSlice = createSlice({
     name:' request',
     initialState: null,

     reducers: {
        addRequest: (state, action) => {
          return action.payload; 
        },
        removeRequest: (state, action)=>{
           const newArray= state.filter((r)=>  r._id != action.payload);
           return newArray;
        }
  }
});


  export default requestSlice.reducer;
  export const {addRequest, removeRequest} = requestSlice.actions;
