import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: undefined,
  token: undefined,
  isSigned: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isSigned = true;
    },
    removeAuth(state) {
      state.email = undefined;
      state.token = undefined;
      state.isSigned = false;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;