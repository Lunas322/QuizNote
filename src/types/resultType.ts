export type UserAnswer = {
  answer: number;
  question: string;
  questionIndex: number;
};

export type ResultData = {
  examId: string;
  uid: string;
  title?: string;
  userAnswer: UserAnswer[];
};
