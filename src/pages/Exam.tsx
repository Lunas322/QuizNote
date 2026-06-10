import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { getAuth } from "firebase/auth";
import { useResultStore } from "../store/useResult";
import Modal from "../components/Modal";
import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";
import { useExam } from "../hooks/useExam";
import AnswerBox from "../components/AnswerBox";
import ExamButton from "../components/ExamButton";
import { useQuestion } from "../hooks/useQuestion";
import { useAnswer } from "../hooks/useAnswer";
import { useSubmitExam } from "../hooks/useSubmitExam";
import AuthGuard from "../components/AuthGuard";

function Exam() {
  const { title } = useParams();
  const { exam, loading } = useExam(title ?? "");
  const maxCount = exam[0]?.examData.length;
  const { questionCount, beforeQuestionCount, nextQuestionCount } =
    useQuestion(maxCount);
  const auth = getAuth();
  const resultData = useResultStore((state) => state.resultData);
  const setResultData = useResultStore((State) => State.setResultData);
  const resetResultData = useResultStore((state)=> state.resetResultData)
  const selectedQuestion = exam[0]?.examData[questionCount - 1];
  const { currentAnswer, handleSelect } = useAnswer({
    setResultData,
    selectedQuestion,
    questionCount,
    resultData,
  });
  const { moveResult, showModal, setShowModal } = useSubmitExam({
    title,
    resultData,
  });

  useEffect(()=>{
    resetResultData()
  },[])


  useEffect(() => {
    if (!exam[0]) return;
    setResultData({
      uid: auth.currentUser?.uid,
      examId: exam[0].id,
      title: title,
    });
  }, [title,exam]);

  const functions = {
    beforeQuestionCount,
    moveResult,
    nextQuestionCount,
  };
  if (loading) return <Loading />;

  return (
    <AuthGuard>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">📝 {title}</h1>

          <p className="mt-2 text-gray-500">문제를 읽고 정답을 선택하세요.</p>
        </div>

        <ProgressBar maxCount={maxCount} questionCount={questionCount} />

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <Question
            question={selectedQuestion?.question}
            questionCount={questionCount}
          />

          <div className="space-y-4">
            {selectedQuestion?.options.map((option, index) => (
              <AnswerBox
                onChange={() => handleSelect(index)}
                option={option}
                index={index}
                currentAnswer={currentAnswer}
                questionCount={questionCount}
              />
            ))}
          </div>

          <ExamButton
            questionCount={questionCount}
            maxCount={maxCount}
            functions={functions}
            resultData={resultData}
          />
        </div>
      </div>
      {showModal ? (
        <Modal
          title="제출하기"
          text="제출하면 더이상 수정 할 수 없습니다 "
          onclick={() => moveResult()}
          otherButton={true}
          onclickotherButton={() => setShowModal(false)}
        />
      ) : null}
    </div>
    </AuthGuard>
  );
}

export default Exam;
