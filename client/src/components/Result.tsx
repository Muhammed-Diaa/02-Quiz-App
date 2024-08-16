/* eslint-disable @typescript-eslint/no-unused-vars */
import Layout from "./Layout/layout";
import { table } from "../data/list";
import { Init } from "../types/types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuestionsContext } from "../context/useContext";
import { resetResultAction } from "../Redux/actions/resultReducer";
import { resetAllAction, checkAnswers } from "../Redux/actions/questionReducer";

function Result() {
  const dispatch = useDispatch();
  const { setStartNew, startNew, setIsQuizEnd } = useQuestionsContext();

  const { queue, answers } = useSelector((state: Init) => state.questions);
  const { result } = useSelector(
    (state: { result: { result: number[]; userID: string } }) => state.result
  );

  const handleReset = () => {
    setIsQuizEnd(false);
    setStartNew(!startNew);
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  };
  const correctAnswers = answers.filter((item, i) => item === result[i]).length;
  const totalPoints = queue.length * 10;
  const earnedPoints = correctAnswers * 10;
  const quizResult = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <Layout>
      <div className={`block space-y-4 relative my-10 mx-auto w-full h-auto `}>
        <div
          className={`flex flex-col justify-center border border-neutral px-[4em] py-[3em] gap-[1em] `}
        >
          {table.map((item, i) => (
            <div key={i} className={`flex w-full justify-between`}>
              <span className={`text-[1.4em] text-neutral `}>{item.title}</span>
              <span className={`text-[1.4em] text-neutral achive `}>
                {i === 0 && totalPoints}
                {i === 1 && totalPoints / 10}
                {i === 2 && 1}
                {i === 3 && earnedPoints}
                {i === 4 && correctAnswers}
                {i === 5 && `${quizResult}%`}
              </span>
            </div>
          ))}
        </div>
        <div className={`flex justify-between w-full`}>
          <Link
            to={"/quiz"}
            onClick={() => {
              dispatch(checkAnswers());
            }}
            className={`text-center w-[200px] font-bold text-[24px] p-4 bg-primary rounded `}
          >
            Check
          </Link>
          <Link
            to={`/`}
            onClick={handleReset}
            className={` text-center w-[200px] font-bold text-[24px] p-4 bg-primary rounded `}
          >
            Restart Quiz
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Result;
