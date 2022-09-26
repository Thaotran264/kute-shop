import { createSlice } from '@reduxjs/toolkit'
let authInfo
if (typeof window !== "undefined") {
  authInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
}
const setAuthFunc = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
const initialState = {
  isLogin: false,
  authInfo
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) => {
      state.isLogin = true,
      state.authInfo= action.payload,
      setAuthFunc(state.authInfo)
    },
    logout: (state, action) => {
      state.authInfo= action.payload,
      state.isLogin = false
      setAuthFunc(state.authInfo)

    },
 
  },
})

export const selectAuth = (state) => state.auth;
export const {login, logout} = authSlice.actions;

export default authSlice.reducer