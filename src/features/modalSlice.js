import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  editModal: false,
  currentTodoId: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    setCurrentTodoId: (state, action) => {
      state.currentTodoId = action.payload;
    },
  },
});

export const { setModal, setEditModal, setCurrentTodoId } = modalSlice.actions;
export default modalSlice.reducer;
