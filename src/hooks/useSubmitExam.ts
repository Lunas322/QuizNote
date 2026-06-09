import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import type { ResultData } from "../types/resultType";

type UseSubmitExamProps = {
  title: string | undefined;
  resultData: ResultData;
};

export function useSubmitExam({ title, resultData }: UseSubmitExamProps) {
  const nav = useNavigate();
  const auth = getAuth();

  const [showModal, setShowModal] = useState(false);

  const fireStoreAddExam = async () => {
    if (!auth.currentUser?.uid) return;
    try {
      await addDoc(collection(db, "userAnswer"), {
        uid: auth.currentUser.uid,
        title: title,
        examId: resultData.examId,
        userAnswer: resultData.userAnswer,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
      alert("서버 저장 실패");
    }
  };

  const moveResult = async () => {
    if (!showModal) {
      setShowModal(true);
    } else if (showModal) {
      try {
        await fireStoreAddExam();
        nav(`/result/${resultData.examId}`);
      } catch (error) {
        console.error(error);
        alert("서버 저장 실패");
      }
    }
  };
  return {
    moveResult,
    showModal,
    setShowModal,
  };
}
