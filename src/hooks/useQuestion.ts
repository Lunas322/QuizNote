import { useState } from "react";

export function useQuestion(maxCount: number) {
  const [questionCount, setQuestionCount] = useState(1);

  const nextQuestionCount = () => {
    if (maxCount == questionCount) return;
    setQuestionCount(questionCount + 1);
  };

  const beforeQuestionCount = () => {
    if (questionCount == 1) return;
    setQuestionCount(questionCount - 1);
  };
  return {
    questionCount,
    nextQuestionCount,
    beforeQuestionCount,
  };
}
