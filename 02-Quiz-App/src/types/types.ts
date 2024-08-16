import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export interface Props {
  onChecked: (check: number) => void;
  onAdd: () => void;
}

export interface Init {
  questions: { trace: number; queue: string[]; answers: number[] };
}
export interface Queue {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string | number;
}
export interface Result {
  result: { result: []; userID: string | undefined };
}
export interface Next {
  trace: number;
  dispatch: Dispatch<UnknownAction>;
  result: string[];
  idx: number;
}
export interface Prev {
  result: string[];
  userID: string;
}
export interface Index {
  trace: number;
  checked: number | undefined;
}
export interface QuesNumType {
  title: string | undefined;
  trace: number;
}
export interface QuestionsContextProps {
  data: Queue[];
  isLoading: boolean;
  startNew: boolean;
  setStartNew: (startNew: boolean) => void;
  isQuizEnd: boolean;
  setIsQuizEnd: (isQuizEnd: boolean) => void;
  questionTrace: QuesNumType | null;
  setQuestionTrace: (questionTrace: QuesNumType | null) => void;
}
