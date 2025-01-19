import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const storeSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    updatePaste: (state, action) => {
      const paste = action.payload;
      console.log(state.pastes);
      const index = state.pastes.findIndex((item) => {
        return (item.id) == (action.payload.id);
      });
      console.log(index);
      if (index >= 0) {
        state.pastes[index] = paste;
        console.log(state.pastes);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },
    resetPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removePaste: (state, action) => {
      const index = state.pastes.findIndex(
        (item) => item.id === action.payload
      );
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },
  },
});

export const { addPaste, updatePaste, resetPastes, removePaste } =
  storeSlice.actions;
export default storeSlice.reducer;
