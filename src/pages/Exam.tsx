import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import type { ExamQuestion } from "../types/examType";
import Loading from "./Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Exam() {
  const { title } = useParams();
  const [exam, setExam] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const [qusetionCount, setQuestionCount] = useState(1);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("user uid 없음");
        return;
      }

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

        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log("함수 끝");
      }
    });

    return () => unsubscribe();
  }, [title]);

  const nextQuestionCount = () => {
    if (exam[0].examData.length  == qusetionCount) return;
    setQuestionCount(qusetionCount + 1);
  };

  const beforeQuestionCount = () => {
    if (qusetionCount == 1) return;
    setQuestionCount(qusetionCount -1);
  };
  if (loading) return <Loading />;

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
            {exam[0]?.examData[qusetionCount-1]?.question}
          </h2>

          <div className="space-y-4">
            {exam[0]?.examData[qusetionCount-1].options.map((option
            )=>{
              return(
             <button className="w-full rounded-xl border border-gray-200 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50">
            {option}
            </button>
              )
            })}
     
          </div>

          <div className="mt-8 flex justify-between">
            <button
              disabled={qusetionCount == 0}
              className={`rounded-xl ${qusetionCount == 1 ? " bg-gray-200 text-gray-500" : "bg-blue-500 text-white  hover:bg-blue-600"} px-6 py-3 font-semibold`}
              onClick={() => beforeQuestionCount()}
            >
              이전
            </button>

            <button
              className={`rounded-xl ${qusetionCount == exam[0].examData.length ? " bg-gray-200 text-gray-500" : "bg-blue-500 text-white  hover:bg-blue-600"} px-6 py-3 font-semibold`}
              onClick={() => nextQuestionCount()}
            >
              다음 문제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exam;
