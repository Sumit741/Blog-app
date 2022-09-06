import { createSlice } from "@reduxjs/toolkit";

const initialValue = { isAuth: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    setIsAuthTrue(state, action) {
      state.isAuth = true;
    },
    setIsAuthFalse(state, action) {
      state.isAuth = false;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
