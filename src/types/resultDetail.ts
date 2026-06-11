import { Timestamp } from "firebase/firestore";
import type { UserAnswer } from "./resultType";

export type ResultDetail = {
  correctAnswers: UserAnswer[];
  wrongAnswers: UserAnswer[];
  createdAt: Timestamp;

  examId: string;
  uid: string;
  title: string;

  score: number;
};
