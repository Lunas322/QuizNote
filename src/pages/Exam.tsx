import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import type { ExamQuestion } from "../types/examType";
import Loading from "./Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useResultStore } from "../store/useResult";
import Modal from "../components/Modal";

function Exam() {
  const { title } = useParams();
  const [exam, setExam] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const [qusetionCount, setQuestionCount] = useState(1);
  const resultData = useResultStore((state) => state.resultData);
  const setResultData = useResultStore((State) => State.setResultData);
  const nav = useNavigate()
  const [showModal,setShowModal] = useState(false)

  useEffect(() => {
    console.log(resultData);
  }, [resultData]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "quizzes"),
          where("uid", "==", user.uid),
          where("title", "==", title),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ExamQuestion, "id">),
        }));

        setExam(data);
        setResultData({ uid: auth.currentUser?.uid, examId: data[0].id });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [title]);

  const nextQuestionCount = () => {
    if (exam[0].examData.length == qusetionCount) return;
    setQuestionCount(qusetionCount + 1);
  };

  const beforeQuestionCount = () => {
    if (qusetionCount == 1) return;
    setQuestionCount(qusetionCount - 1);
  };
  if (loading) return <Loading />;

  

  const currentAnswer = resultData.userAnswer.find(
    (item) => item.questionIndex === qusetionCount - 1,
  )?.answer;

  const handleSelect = (answerIndex: number) => {
    const selectedQuestion = exam[0]?.examData[qusetionCount - 1];

    if (!selectedQuestion) return;

    const existing = resultData.userAnswer.find(
      (item) => item.questionIndex === qusetionCount - 1,
    );

    if (existing) {
      setResultData({
        userAnswer: resultData.userAnswer.map((item) =>
          item.questionIndex === qusetionCount - 1
            ? {
                ...item,
                answer: answerIndex,
              }
            : item,
        ),
      });
    } else {
      setResultData({
        userAnswer: [
          ...resultData.userAnswer,
          {
            answer: answerIndex,
            question: selectedQuestion.question,
            questionIndex: qusetionCount - 1,
          },
        ],
      });
    }
  };

  const fireStoreAddExam = async ()=>{
    if(!auth.currentUser?.uid) return
          try{
            await addDoc(collection(db,"userAnswer"),{
              uid: auth.currentUser.uid,
              title: title,
              examId: resultData.examId,
              userAnswer: resultData.userAnswer
            })
          }catch(error) {
            console.log(error)
          }
  }
    
  

    const moveResult = ()=>{
    if(!showModal) {
      setShowModal(true)
    } else if(showModal) {
          fireStoreAddExam()
          nav(`/result/${resultData.examId}`)
        }
    }
    


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">📝 {title}</h1>

          <p className="mt-2 text-gray-500">문제를 읽고 정답을 선택하세요.</p>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-gray-500">
            <span>진행률</span>
            <span>
              {qusetionCount} / {loading ? 1 : exam[0]?.examData.length}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{
                width: `${(qusetionCount / exam[0]?.examData.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <div className="mb-2 text-sm font-semibold text-blue-500">
            문제 {qusetionCount}
          </div>

          <h2 className="mb-8 text-2xl font-bold text-gray-800">
            {exam[0]?.examData[qusetionCount - 1]?.question}
          </h2>

          <div className="space-y-4">
            {exam[0]?.examData[qusetionCount - 1]?.options.map(
              (option, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50"
                >
                  <input
                    type="radio"
                    name={`question-${qusetionCount - 1}-${index}`}
                    value={index}
                    checked={currentAnswer == index}
                    onChange={() => handleSelect(index)}
                  />

                  <span>{option}</span>
                </label>
              ),
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              disabled={qusetionCount == 0}
              className={`rounded-xl ${qusetionCount == 1 ? " bg-gray-200 text-gray-500" : "bg-blue-500 text-white  hover:bg-blue-600"} px-6 py-3 font-semibold`}
              onClick={() => beforeQuestionCount()}
            >
              이전
            </button>
            {resultData.userAnswer.length == exam[0]?.examData.length && exam[0]?.examData.length == qusetionCount ? (
              <button
                className={`rounded-xl bg-blue-500 text-white  hover:bg-blue-600 px-6 py-3 font-semibold`}
                onClick={() => moveResult()}
              >
                제출하기
              </button>
            ) : (
              <button
                className={`rounded-xl ${qusetionCount  == exam[0]?.examData.length ? " bg-gray-200 text-gray-500" : "bg-blue-500 text-white  hover:bg-blue-600"} px-6 py-3 font-semibold`}
                onClick={() => nextQuestionCount()}
              >
                다음 문제
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal?
      <Modal title="제출하기" text="제출하면 더이상 수정 할 수 없습니다 " onclick={()=>moveResult()} otherButton={true} onclickotherButton={()=>setShowModal(false)}/>:null}
    </div>
  );
}

export default Exam;
