import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [], 

  reducers: {
    addConnection: (state, action) => {
      console.log("Adding connections:", action.payload);
      return action.payload; 
    },

    removeConnection: (state, action) => {
      return []; 
    }
    
  }
});

export default connectionSlice.reducer;
export const { addConnection, removeConnection } = connectionSlice.actions; 
