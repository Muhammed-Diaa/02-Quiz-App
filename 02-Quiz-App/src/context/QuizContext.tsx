// QuestionsContext.tsx
import { QuesNumType, QuestionsContextProps, Queue } from "../types/types";
import { createContext, useState, useEffect, ReactNode } from "react";
import { startExamAction } from "../Redux/actions/questionReducer";
import { useDispatch } from "react-redux";
// import { AxiosResponse } from "axios";
import { programming, sports, math, science } from "../data/data";
// import apiRequest from "../lib/apiRequest";
import { initData } from "../Redux/actions/resultReducer";
import { RandomItems } from "../lib/RandomQuestions";

export const QuestionsContext = createContext<
  QuestionsContextProps | undefined
>(undefined);

interface QuestionsProviderProps {
  children: ReactNode;
}

export const QuestionsProvider: React.FC<QuestionsProviderProps> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Queue[]>([]);
  const [questionTrace, setQuestionTrace] = useState<QuesNumType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startNew, setStartNew] = useState(false);
  const [isQuizEnd, setIsQuizEnd] = useState(false);

  const ques = questionTrace?.title;
  const trace = questionTrace?.trace;
  console.log("ques", ques);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const randomArray =
          ques === "programming"
            ? programming
            : ques === "sports"
            ? sports
            : ques === "math"
            ? math
            : science;

        const mainData = RandomItems(randomArray, trace ?? 1);
        console.log("mainData", mainData);
        if (mainData) {
          setQuestions(mainData);
          dispatch(startExamAction(mainData));
          dispatch(initData(mainData));
        } else {
          throw new Error("No questions found");
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
  }, [dispatch, ques, questionTrace?.trace]);

  return (
    <QuestionsContext.Provider
      value={{
        data: questions,
        isLoading,
        setStartNew,
        startNew,
        isQuizEnd,
        setIsQuizEnd,
        setQuestionTrace,
        questionTrace,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
