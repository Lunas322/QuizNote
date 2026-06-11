import { useState, type SetStateAction } from "react";
import { usePostStore } from "../store/usePostData";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getExamQuestions } from "../utils/gemini";
import { db } from "../firebase/firebase";

type useGetExamParms = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export function useGetExam({ setShowModal, loading }: useGetExamParms) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const postData = usePostStore((state) => state.postData);
  const auth = getAuth();
  const nav = useNavigate();

  const handlePostAi = async () => {
    if (loading || !postData.content || !postData.count || !auth.currentUser) {
      return;
    }

    try {
      setButtonLoading(true);

      const data = await getExamQuestions(postData.content, postData.count);

      await addDoc(collection(db, "quizzes"), {
        uid: auth.currentUser.uid,
        examData: data,
        title: postData.title,
      });

      nav(`/exam/${postData.title}`);
    } catch (error) {
      console.error(error);

      setShowModal(true);
    } finally {
      setButtonLoading(false);
    }
  };
  return { handlePostAi, buttonLoading };
}
