import { create } from "zustand";

type UserAnswer = {
  question: string;
  answer: number;
};

type ResultData = {
  examId: string;
  uid: string;
  userAnswer: UserAnswer[];
};

type ResultStore = {
  resultData: ResultData;
  setResultData: (data: Partial<ResultData>) => void;
};

export const useResultStore = create<ResultStore>((set) => ({
  resultData: {
    examId: "",
    uid: "",
    userAnswer: [],
  },
  setResultData: (data) =>
    set((state) => ({
      resultData: {
        ...state.resultData,
        ...data,
      },
    })),
}));
