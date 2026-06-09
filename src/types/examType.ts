export type ExamQuestion = {
  id: string;
  uid: string;
  title: string;
  examData: ExamData[];
};

export type ExamData = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};
