import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  userData: {},
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    loginStart: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    loginSuccess: (state, { payload }) => ({
      ...state,
      token: payload.token,
      email: payload.email,
      userData: payload.userData,
      isLoading: false,
      error: null,
    }),
    loginError: (state, { payload }) => {
      return {
        token: null,
        email: null,
        ...state,
        userData: {},
        error: payload,
        isLoading: false,
      };
    },
    logout: () => ({
      token: null,
      email: null,
      userData: {},
      isLoading: false,
      error: null,
    }),
  },
});

export const { loginStart, loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;
