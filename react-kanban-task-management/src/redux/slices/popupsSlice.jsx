import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  createBoardIsActive: false,
  editBoardIsActive: false,
  deleteButtonIsActive: false,
  boardMenuIsActive: false,
  addTaskIsActive: false,
};

export const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    setCreateBoardIsActive: (state, action) => {
      state.createBoardIsActive = action.payload;
    },
    setAddTaskIsActive: (state, action) => {
      state.addTaskIsActive = action.payload;
    },
    setEditBoardIsActive: (state, action) => {
      state.editBoardIsActive = action.payload;
    },
    setDeleteButtonIsActive: (state, action) => {
      state.deleteButtonIsActive = action.payload;
    },
    setBoardMenuIsActive: (state, action) => {
      state.boardMenuIsActive = action.payload;
    },
  },
});

export const {setCreateBoardIsActive, setAddTaskIsActive, setEditBoardIsActive, setDeleteButtonIsActive, setBoardMenuIsActive} = popupsSlice.actions;
export default popupsSlice.reducer;
