import type { ResultData } from "../types/resultType";

type UseGrading = {
  result: ResultData | null;
};
export function useGrading({ result }: UseGrading) {
  if (!result) {
    return {
      correctAnswers: [],
      wrongAnswers: [],
    };
  }

  const correctAnswers = result.userAnswer.filter((data) => {
    return data.answer === data.correctAnswer;
  });
  const wrongAnswers = result.userAnswer.filter((data) => {
    return data.answer !== data.correctAnswer;
  });
  return { correctAnswers, wrongAnswers };
}
