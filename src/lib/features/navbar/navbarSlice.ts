import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isNavbarOpen: true,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    setNavbarVisibility: (state, action) => {
      state.isNavbarOpen = action.payload;
    },
  },
});

export const {toggleNavbar, setNavbarVisibility} = navbarSlice.actions;
export const navbarReducer = navbarSlice.reducer;
