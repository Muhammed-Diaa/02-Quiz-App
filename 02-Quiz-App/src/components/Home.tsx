import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout/layout";
import "../styles/index.css";
import _ from "lodash";
import toast from "react-hot-toast";
import { setUserID } from "../Redux/actions/resultReducer";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "../types/types";
import { useQuestionsContext } from "../context/useContext";

const list = [
  { title: "You will be asked some questions one after the other." },
  { title: "10 point is awarded for each correct answer." },
  { title: "Each question has 4 options. You have to select the correct one." },
  { title: "You can review and change answers befor the quiz finish." },
  { title: "The result will be declared at the end quiz ." },
];

const about = [
  { title: "sports" },
  { title: "programming" },
  { title: "math" },
  { title: "science" },
];
function Home() {
  const dispatch = useDispatch();
  const route = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { userID } = useSelector((state: Result) => state.result);
  const { setQuestionTrace } = useQuestionsContext();
  const [idxs, setIDX] = useState<number>();
  const [types, setType] = useState<string>();

  // console.log(userID);
  const onHandleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = inputRef.current;
    const userID =
      username?.value
        .split(" ")
        .map((i) => i.charAt(0).toLocaleUpperCase() + i.slice(1))
        .join(" ") || "";

    if (username && username.value.length <= 0) {
      toast.error(`Please enter your name`);
      return;
    }
    if (!idxs) {
      toast.error("Please select number of question");
      return;
    }
    if (!types) {
      toast.error("Please select the type of questions");
      return;
    }
    dispatch(setUserID(userID));
    route("/quiz");
    setQuestionTrace({ trace: idxs, title: types });
    toast.success(`Hello ${userID}`);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  // console.log("types", types);
  return (
    <Layout>
      <div className={`flex`}>
        <div className="w-2/3">
          <h1 className={`headTital`}> Quiz Rules</h1>
          <ol className={`pl-4 pt-2`}>
            {list.map((item, idx) => (
              <li className={`list-decimal`} key={idx}>
                {item.title}
              </li>
            ))}
          </ol>
        </div>
        <div className={`w-1/3`}>
          <h1 className={`headTital`}>Questions about ...</h1>
          <ul className={`flex flex-wrap gap-2 justify-between pt-2`}>
            {about.map((item, i) => (
              <button
                key={i}
                className={`w-[140px] transition-transform duration-500 bg-warning py-4 rounded-xl font-bold ${
                  types !== undefined
                    ? types === item.title
                      ? "opacity-100 scale-[1.1] text-[#fff]"
                      : "opacity-50 scale-[0.95]" // Lower opacity for unselected buttons
                    : "opacity-70 scale-[1]" // Default opacity for buttons before any selection
                }`}
                onClick={() => {
                  setType(item.title);
                }}
              >
                {_.capitalize(item.title)}
              </button>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className={`headTital`}>Choose how many question do you want ?</h1>
        <ul className={`flex justify-between`}>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              className={`${
                idxs
                  ? (i + 1) * 10 === idxs
                    ? "opacity-100 scale-[1.1] text-white"
                    : "opacity-50 scale-[.95]"
                  : "opacity-100 scale-[1]"
              } text-[20px] transition-transform duration-500 bg-warning px-[70px] py-4 rounded-xl font-bold`}
              onClick={() => {
                setIDX((i + 1) * 10);
              }}
            >
              {(i + 1) * 10}
            </button>
          ))}
        </ul>
      </div>

      <form onSubmit={(e) => onHandleClick(e)} className="flex justify-between">
        <div className={`flex items-start flex-col gap-2`}>
          <label>
            <input
              className={`input focus-visible:outline-none border-none bg-primary`}
              type="text"
              defaultValue={userID}
              ref={inputRef}
              name={`username`}
              placeholder="Username"
            />
          </label>
        </div>
        <button
          className="mb-10 
        bg-primary py-3 px-4 rounded-lg"
        >
          Start Quiz
        </button>
      </form>
    </Layout>
  );
}

export default Home;
