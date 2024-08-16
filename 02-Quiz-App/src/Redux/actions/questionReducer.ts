import { createSlice } from "@reduxjs/toolkit";
import { Queue } from "../../types/types";

const questionsReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      const Data = action.payload;
      const question = Data?.map((item: Queue) => item.question);
      const correct = Data?.map((item: Queue) => item.correctAnswer);
      const options = Data?.map((item: Queue) => item);
      const answers = options?.map((item: { options: string[] }, idx: number) =>
        typeof correct[idx] === "string"
          ? item.options.indexOf(correct[idx])
          : correct[idx]
      );
      return {
        ...state,
        queue: question,
        answers: answers,
      };
    },
    selectQuestionAction: (state, action) => {
      return {
        ...state,
        trace: action.payload,
      };
    },
    nextQuestionAction: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    prevQuestionAction: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    checkAnswers: (state) => {
      return {
        ...state,
        trace: 0,
      };
    },
    resetAllAction: () => {
      return {
        answers: [],
        queue: [],
        trace: 0,
      };
    },
  },
});

export default questionsReducer.reducer;
export const {
  startExamAction,
  selectQuestionAction,
  nextQuestionAction,
  prevQuestionAction,
  checkAnswers,
  resetAllAction,
} = questionsReducer.actions;
