import type { ResultData } from "../types/resultType";

type UseGreading = {
  result: ResultData | null;
};
export function useGreading({ result }: UseGreading) {
  if (!result) {
    return {
      correctAnswers: [],
      worngAnswers: [],
    };
  }

  const correctAnswers = result.userAnswer.filter((data) => {
    return data.answer == data.correctAnswer;
  });
  const worngAnswers = result.userAnswer.filter((data) => {
    return data.answer !== data.correctAnswer;
  });
  return { correctAnswers, worngAnswers };
}
