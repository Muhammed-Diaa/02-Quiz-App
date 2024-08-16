import { useDispatch, useSelector } from "react-redux";
import { Init, Result } from "../types/types";
import { useQuestionsContext } from "../context/useContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import Layout from "./Layout/layout";
import Questions from "./Questions";

import {
  selectQuestionAction,
  nextQuestionAction,
  prevQuestionAction,
} from "../Redux/actions/questionReducer";
// import { useEffect } from "react";

function Quiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const result = useSelector((state: Result) => state.result.result);
  const { setIsQuizEnd, isQuizEnd, isLoading } = useQuestionsContext();
  const { queue, trace, answers } = useSelector(
    (state: Init) => state.questions
  );

  const isFinshed = () => {
    if (trace === queue.length - 1 && !result.some((e) => e === undefined)) {
      setIsQuizEnd(true);
      navigate("/result");
    } else {
      trace === queue.length - 1 &&
        toast.error(`Please select an answer for all questions `);
    }
    if (trace < queue.length - 1) {
      dispatch(nextQuestionAction());
    }
  };
  const handlePrev = () => {
    if (trace > 0) {
      dispatch(prevQuestionAction());
    }
  };

  if (isLoading) return <div>Loading</div>;
  return (
    <Layout>
      <div className={`flex gap-4`}>
        <div className="w-full">
          <Questions />
          <div className={`flex justify-between mt-4 w-full`}>
            <button
              className={`btn-1 ${trace === 0 && "opacity-50"}`}
              onClick={() => handlePrev()}
            >
              Prev
            </button>
            <button className={`btn-1`} onClick={isFinshed}>
              {trace === queue?.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>{" "}
        <div className={`h-full rounded max-h-[521px]`}>
          <div className="flex flex-col justify-around h-full items-center overflow-y-scroll scrollbar-none">
            {queue.map((_, i) => (
              <button
                key={i}
                onClick={() => dispatch(selectQuestionAction(i))}
                className={`border-b-[1px] w-16 py-[20px] hover:text-[24px] hover:font-bold ease-out duration-100 border-slate-700 flex justify-center items-center ${
                  typeof result[i] === "number" ? "opacity-100" : "opacity-50"
                } ${
                  isQuizEnd && result[i] === answers[i]
                    ? "bg-green-500 text-black"
                    : "bg-warning"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;
