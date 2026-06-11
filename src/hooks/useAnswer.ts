import type { ResultData } from "../types/resultType";
import type { ExamData } from "../types/examType";

type useAnswerType = {
  resultData: ResultData;
  questionCount: number;
  selectedQuestion?: ExamData;

  setResultData: (data: Partial<ResultData>) => void;
};

export function useAnswer({
  resultData,
  questionCount,
  selectedQuestion,
  setResultData,
}: useAnswerType) {
  const currentAnswer = resultData.userAnswer.find(
    (item) => item.questionIndex === questionCount - 1,
  )?.answer;

  const handleSelect = (answerIndex: number) => {
    if (!selectedQuestion) return;

    const existing = resultData.userAnswer.find(
      (item) => item.questionIndex === questionCount - 1,
    );

    if (existing) {
      setResultData({
        ...resultData,
        userAnswer: resultData.userAnswer.map((item) =>
          item.questionIndex === questionCount - 1
            ? {
                ...item,
                answer: answerIndex,
                selectedOption: selectedQuestion.options[answerIndex],
              }
            : item,
        ),
      });
    } else {
      setResultData({
        ...resultData,
        userAnswer: [
          ...resultData.userAnswer,
          {
            answer: answerIndex,
            question: selectedQuestion.question,
            questionIndex: questionCount - 1,
            correctAnswer: selectedQuestion.answer,
            explanation: selectedQuestion.explanation,
            selectedOption: selectedQuestion.options[answerIndex],
            correctOption: selectedQuestion.options[selectedQuestion.answer],
          },
        ],
      });
    }
  };
  return {
    currentAnswer,
    handleSelect,
  };
}
