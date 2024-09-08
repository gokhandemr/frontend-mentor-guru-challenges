import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isActive: localStorage.getItem("dark-theme") ? JSON.parse(localStorage.getItem("dark-theme")) : localStorage.setItem("dark-theme", JSON.stringify(false)),
};

export const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
      localStorage.setItem("dark-theme", JSON.stringify(state.isActive));
    },
  },
});

export const {setIsActive} = darkThemeSlice.actions;
export default darkThemeSlice.reducer;
