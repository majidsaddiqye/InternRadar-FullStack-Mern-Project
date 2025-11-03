import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  recommendations: [],
  loading: false,
  error: null,
  profileComplete: true
};

// Async thunks
export const getRecommendations = createAsyncThunk(
  'recommendation/getRecommendations',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/recommendations', { params });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recommendations');
    }
  }
);

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload.recommendations || [];
        state.profileComplete = action.payload.profileComplete;
      })
      .addCase(getRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearRecommendations } = recommendationSlice.actions;
export default recommendationSlice.reducer;

