import { Dispatch } from "@reduxjs/toolkit";
import * as Action from "../Redux/actions/resultReducer";
import { Index } from "../types/types";

type UpdateResultAction = ReturnType<typeof Action.updateResultAction>;

export const updateResult =
  (index: Index) => async (dispatch: Dispatch<UpdateResultAction>) => {
    try {
      await dispatch(Action.updateResultAction(index));
    } catch (error) {
      console.log(error);
    }
  };
