import { Timestamp } from "firebase/firestore/lite";
import type { UserAnswer } from "./resultType";

export type ResultListData = {
  examId: string;
  uid: string;
  title?: string;
  userAnswer: UserAnswer[];
  createdAt: Timestamp;
  score: number;
  id: string;
};
