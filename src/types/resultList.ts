import { Timestamp } from "firebase/firestore";
import type { UserAnswer } from "./resultType";

export type ResultListData = {
  examId: string;
  uid: string;
  title?: string;
  createdAt: Timestamp;
  score: number;
  id: string;
  correctAnswers: UserAnswer[];
  wrongAnswers: UserAnswer[];
};
