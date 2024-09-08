import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isActive: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const {setIsActive} = sidebarSlice.actions;
export default sidebarSlice.reducer;
