import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import type { UserAnswer } from "../types/resultType";

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
  const totalQuestions = correctAnswers.length + wrongAnswers.length;
  const score =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers.length / totalQuestions) * 100);
  const fireStoreAddResult = async () => {
    console.log("1");
    if (!auth.currentUser?.uid) return;
    console.log("2");
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
    console.log("실행");
    await fireStoreAddResult();
    nav("/");
  };
  return {
    moveHome,
  };
}
