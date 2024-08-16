import _ from "lodash";

const RandomItems = (
  arr: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string | number;
  }[],
  numItems: number
) => {
  return _.sampleSize(arr, numItems);
};
export { RandomItems };
