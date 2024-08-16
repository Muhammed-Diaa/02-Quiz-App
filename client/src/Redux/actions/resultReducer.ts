import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const resultReducer = createSlice({
  name: "result",
  initialState: {
    userID: null,
    result: [] as (number | undefined)[],
  },
  reducers: {
    initData: (state, action) => {
      const Data = action.payload;
      const result = Data.map(() => undefined);
      return {
        ...state,
        result: result,
      };
    },
    setUserID: (
      state: { userID: string | null },
      action: PayloadAction<string | null>
    ) => {
      state.userID = action.payload;
    },
    pushAnswer: (state, action: PayloadAction<number | undefined>) => {
      state.result.push(action.payload);
    },
    updateResultAction: (
      state,
      action: PayloadAction<{ checked: number | undefined; trace: number }>
    ) => {
      const { checked, trace } = action.payload;
      state.result.fill(checked, trace, trace + 1);
    },
    resetResultAction: (state) => {
      const result = state.result.map(() => undefined);
      return {
        userID: null,
        result: result,
      };
    },
  },
});
export default resultReducer.reducer;
export const {
  initData,
  setUserID,
  pushAnswer,
  resetResultAction,
  updateResultAction,
} = resultReducer.actions;
