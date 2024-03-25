
import { createSlice } from '@reduxjs/toolkit';
const counterSlice = createSlice({
  
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    
    increment: state => {
      state.value += 1;
     
      console.log("we are in reducer");
    },
    decrement: state => {
      state.value -= 1;
      console.log("we are in reducer");
    },
    reset: state => {
      console.log("we are in reducer");
      state.value = 10; 
    }
  },
});

export const {increment, decrement,reset} = counterSlice.actions;
export default counterSlice.reducer;
