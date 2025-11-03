import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
  profile: null,
  githubData: null,
  loading: false,
  error: null,
  scanningGithub: false
};

// Async thunks
export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/users/profile');
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await api.put('/users/profile', profileData);
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const scanGithubProfile = createAsyncThunk(
  'user/scanGithubProfile',
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/github/scan', { username });
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to scan GitHub profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.githubData = action.payload.githubData;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Scan GitHub Profile
      .addCase(scanGithubProfile.pending, (state) => {
        state.scanningGithub = true;
        state.error = null;
      })
      .addCase(scanGithubProfile.fulfilled, (state, action) => {
        state.scanningGithub = false;
        state.profile = action.payload.user;
        state.githubData = action.payload.githubData;
      })
      .addCase(scanGithubProfile.rejected, (state, action) => {
        state.scanningGithub = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;

