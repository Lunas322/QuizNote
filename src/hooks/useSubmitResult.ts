import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import type { UserAnswer } from "../types/resultType";
import { calculateResultScore } from "../utils/calculateResultScore";

type UseSubmitResultProps = {
  examId: string;
  correctAnswers: UserAnswer[];
  wrongAnswers: UserAnswer[];
  title: string;
};

export function useSubmitResult({
  examId,
  correctAnswers,
  wrongAnswers,
  title,
}: UseSubmitResultProps) {
  const nav = useNavigate();
  const auth = getAuth();

  const { score } = calculateResultScore({ correctAnswers, wrongAnswers });

  const fireStoreAddResult = async () => {
    if (!auth.currentUser?.uid) {
      throw new Error("로그인이 필요합니다");
    }
    try {
      await addDoc(collection(db, "result"), {
        uid: auth.currentUser.uid,
        title: title,
        examId: examId,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        createdAt: serverTimestamp(),
        score: score,
      });
    } catch (error) {
      console.log(error);
      alert("서버 저장 실패");
    }
  };

  const moveHome = async () => {
    try {
      console.log("실행");
      await fireStoreAddResult();
      nav("/");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "서버 저장 실패");
    }
  };
  return {
    moveHome,
  };
}
