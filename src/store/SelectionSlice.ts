import { createSlice } from '@reduxjs/toolkit';

const selectionSlice = createSlice({
  name: 'selection',
  initialState: {
    selectedItem: undefined, 
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload; 
    },
    clearSelectedId: (state) => {
      state.selectedItem = undefined;
    },
  },
});

export const { setSelectedItem, clearSelectedId } = selectionSlice.actions;

export default selectionSlice.reducer;
