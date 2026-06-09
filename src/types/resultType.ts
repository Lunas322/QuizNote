export type UserAnswer = {
  answer: number;
  question: string;
  questionIndex: number;
  correctAnswer: number;
  explanation: string;
  selectedOption: string;
  correctOption: string;
};

export type ResultData = {
  examId: string;
  uid: string;
  title?: string;
  userAnswer: UserAnswer[];
};
