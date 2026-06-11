type ResultItem = {
  score: number;
};

export function calculateAverageScore(resultList: ResultItem[]) {
  if (resultList.length === 0) return 0;

  const totalScore = resultList.reduce((sum, result) => sum + result.score, 0);

  return Math.round(totalScore / resultList.length);
}
