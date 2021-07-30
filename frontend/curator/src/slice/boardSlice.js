import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: [],
    isLoading: true,
    isSuccess: false,
    error: null,
    date: Date.now(),
  },
  reducers: {
    getBoard: (state, { payload }) => {
      console.log("getBoard 액션 호출");
    },
    getBoardAsync: (state, { payload: data }) => {
      return {
        ...state,
        board: data,
        isSuccess: true,
        isLoading: false,
      };
    },
  },
});

export const boardReducers = boardSlice.reducer;
export const boardActions = boardSlice.actions;
