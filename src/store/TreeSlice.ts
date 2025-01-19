import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTreeItems } from '../repositories/TreeRepository';

import type { Item, TreeState } from '../types';

const initialState: TreeState['tree'] = {
  items: null,
  isLoading: false,
  error: null,
};

export const fetchTreeItemsThunk = createAsyncThunk(
  'tree/fetchTreeItems',
  async (mainId: string, { rejectWithValue }) => {
    try {
      const data = await fetchTreeItems(mainId);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreeItemsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTreeItemsThunk.fulfilled, (state, action: PayloadAction<Item>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTreeItemsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default treeSlice.reducer;
