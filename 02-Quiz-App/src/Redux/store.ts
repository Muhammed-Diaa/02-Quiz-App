import { combineReducers, configureStore } from "@reduxjs/toolkit";

import questionsReducer from "./actions/questionReducer";
import resultReducer from "./actions/resultReducer";

const rootReducer = combineReducers({
  questions: questionsReducer,
  result: resultReducer,
});

export default configureStore({
  reducer: rootReducer,
});
