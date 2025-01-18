import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCompanyData } from '../repositories/CompanyRepository';

import type { CompanyState, Company } from '../types';

const initialState: CompanyState['company'] = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchCompanyDataThunk = createAsyncThunk(
  'main/fetchCompanyData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCompanyData();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDataThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDataThunk.fulfilled, (state, action: PayloadAction<Company[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default companySlice.reducer;
