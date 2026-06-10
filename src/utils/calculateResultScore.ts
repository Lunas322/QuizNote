import type { UserAnswer } from "../types/resultType";

type CalculateResultScoreParams = {
  correctAnswers: UserAnswer[];
  wrongAnswers: UserAnswer[];
};

export function calculateResultScore({
  correctAnswers,
  wrongAnswers,
}: CalculateResultScoreParams) {
  const correctCount = correctAnswers.length;
  const wrongCount = wrongAnswers.length;
  const totalQuestions = correctCount + wrongCount;

  const score =
    totalQuestions === 0
      ? 0
      : Math.round((correctCount / totalQuestions) * 100);

  return {
    score,
    totalQuestions,
    correctCount,
    wrongCount,
  };
}
