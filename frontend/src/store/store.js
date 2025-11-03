import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import internshipReducer from './slices/internshipSlice';
import recommendationReducer from './slices/recommendationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    internship: internshipReducer,
    recommendation: recommendationReducer
  }
});

