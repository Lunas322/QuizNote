import type { ResultListData } from "../types/resultList";

export function calculateTotalQuestionCount(
  resultList: ResultListData[],
): number {
  return resultList.reduce(
    (sum, result) =>
      sum + result.correctAnswers.length + result.wrongAnswers.length,
    0,
  );
}
