import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "../hooks/updateResult";
import { Init, Queue, Result } from "../types/types";
import { useQuestionsContext } from "../context/useContext";
function Questions() {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState<number | undefined>(undefined);

  const { data } = useQuestionsContext();
  const { isQuizEnd } = useQuestionsContext();

  const trace = useSelector((state: Init) => state.questions.trace);
  const result = useSelector((state: Result) => state.result.result);
  const answers = useSelector((state: Init) => state.questions.answers);
  const question: Queue = data && data[trace];

  useEffect(() => {
    !isQuizEnd && updateResult({ trace, checked })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  const handleChange = (idx: number) => {
    setChecked(idx);
    updateResult({ checked, trace })(dispatch);
  };

  if (!question) return <div>Loading...</div>;
  if (!data) return <div>Quiz is finished</div>;

  return (
    <div className="flex flex-col gap-10">
      <div className="font-bold min-h-[90px] text-[30px] flex items-center">
        <div>{trace + 1 + "- " + question?.question}</div>
      </div>
      <ul key={question?.id}>
        {question?.options.map((item, idx) => (
          <li key={idx}>
            <input
              className={`invisible`}
              type="radio"
              value={0}
              name="option"
              id={`q-option-${idx}`}
              onChange={!isQuizEnd ? () => handleChange(idx) : () => {}}
            />

            <label
              className={`${isQuizEnd && "cursor-default text-"}`}
              htmlFor={`q-option-${idx}`}
            >
              <div
                className={`check  ${
                  result[trace] === idx
                    ? !isQuizEnd
                      ? "checked"
                      : answers[trace] === idx
                      ? "checked"
                      : "checkedFalse"
                    : isQuizEnd && answers[trace] === idx && "checkedTrue"
                }`}
              ></div>
              <div>{item}</div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
