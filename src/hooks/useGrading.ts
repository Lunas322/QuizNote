import type { ResultData } from "../types/resultType";

type UseGreading = {
  result: ResultData | null;
};
export function useGreading({ result }: UseGreading) {
  if (!result) {
    return {
      correctAnswers: [],
      wrongAnswers: [],
    };
  }

  const correctAnswers = result.userAnswer.filter((data) => {
    return data.answer == data.correctAnswer;
  });
  const wrongAnswers = result.userAnswer.filter((data) => {
    return data.answer !== data.correctAnswer;
  });
  return { correctAnswers, wrongAnswers };
}
