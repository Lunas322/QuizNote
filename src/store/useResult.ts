import { create } from "zustand";
import type { ResultData } from "../types/resultType";

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
