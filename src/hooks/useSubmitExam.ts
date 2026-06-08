import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const moveResult = () => {
    if (!showModal) {
      setShowModal(true);
    } else if (showModal) {
      fireStoreAddExam();
      nav(`/result/${resultData.examId}`);
    }
  };
  return {
    moveResult,
    showModal,
    setShowModal,
  };
}
