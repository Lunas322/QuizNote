import { useState, type SetStateAction } from "react";
import { usePostStore } from "../store/usePostData";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getExamQuestions } from "../utils/gemini";
import { db } from "../firebase/firebase";

type UseGetExamParams = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<SetStateAction<string>>;
  setModalText: React.Dispatch<SetStateAction<string>>;
  loading: boolean;
};

export function useGetExam({
  setShowModal,
  loading,
  setModalText,
  setModalTitle,
}: UseGetExamParams) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const postData = usePostStore((state) => state.postData);
  const auth = getAuth();
  const nav = useNavigate();

  const handlePostAi = async () => {
    if (
      loading ||
      !postData.content ||
      !postData.title.trim() ||
      !postData.count ||
      !auth.currentUser
    ) {
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

      let message = "알 수 없는 오류가 발생했습니다.";

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes("quota")) {
          message = "오늘의 무료 생성 횟수가 모두 소진되었어요.";
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("failed to fetch")
        ) {
          message = "인터넷 연결을 확인한 후 다시 시도해주세요.";
        } else if (errorMessage.includes("permission")) {
          message = "권한이 없습니다.";
        } else if (
          errorMessage.includes("503") ||
          errorMessage.includes("overloaded") ||
          errorMessage.includes("unavailable")
        ) {
          message =
            "현재 서버 이용자가 많아 요청을 처리하지 못하고 있어요. 잠시 후 다시 시도해주세요.";
        }
      }

      setModalTitle("문제 생성 실패");
      setModalText(message);
      setShowModal(true);
    } finally {
      setButtonLoading(false);
    }
  };
  return { handlePostAi, buttonLoading };
}
