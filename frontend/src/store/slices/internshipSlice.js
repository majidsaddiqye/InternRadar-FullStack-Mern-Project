import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  internships: [],
  currentInternship: null,
  filters: {
    tags: [],
    techStacks: [],
    locations: []
  },
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  },
  loading: false,
  error: null
};

// Async thunks
export const getAllInternships = createAsyncThunk(
  'internship/getAllInternships',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/internships', { params });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch internships');
    }
  }
);

export const getInternshipById = createAsyncThunk(
  'internship/getInternshipById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/internships/${id}`);
      return data.data.internship;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch internship');
    }
  }
);

export const getFilterOptions = createAsyncThunk(
  'internship/getFilterOptions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/internships/filters/options');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch filters');
    }
  }
);

const internshipSlice = createSlice({
  name: 'internship',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentInternship: (state) => {
      state.currentInternship = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get All Internships
      .addCase(getAllInternships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInternships.fulfilled, (state, action) => {
        state.loading = false;
        state.internships = action.payload.internships;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllInternships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Internship By ID
      .addCase(getInternshipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInternshipById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInternship = action.payload;
      })
      .addCase(getInternshipById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Filter Options
      .addCase(getFilterOptions.fulfilled, (state, action) => {
        state.filters = action.payload;
      });
  }
});

export const { clearError, clearCurrentInternship } = internshipSlice.actions;
export default internshipSlice.reducer;

