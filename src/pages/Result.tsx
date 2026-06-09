import { useNavigate, useParams } from "react-router-dom";
import { useResult } from "../hooks/useResult";
import { useGreading } from "../hooks/useGrading";
import Loading from "./Loading";
import { useSubmitResult } from "../hooks/useSubmitResult";
import { getAuth } from "firebase/auth";
import NotLogin from "./NotLogin";

function Result() {
  const { examId } = useParams();
  const auth = getAuth()
 const nav = useNavigate()
  const { result, loading } = useResult(examId ?? "");
  const { correctAnswers, worngAnswers } = useGreading({ result });
  const title = result?.title
      const {moveHome} = useSubmitResult({
          examId: examId ?? '',correctAnswers,worngAnswers,title: title ?? ''
      })

  
  const totalQuestions =
  correctAnswers.length + worngAnswers.length;
  
  const score =
  totalQuestions === 0
  ? 0
  : Math.round((correctAnswers.length / totalQuestions) * 100);
  
  if (loading) return <Loading />;
  if (!auth.currentUser) return <NotLogin/>
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-800">
            🎉 시험 결과
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            시험이 완료되었습니다.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-xl">
          <div className="mb-2 text-sm font-semibold tracking-widest text-gray-400 uppercase">
            Final Score
          </div>

          <div className="mb-4 text-7xl font-black text-blue-500">
            {score}
            <span className="ml-2 text-3xl">점</span>
          </div>

          <p className="text-lg text-gray-500">
            수고하셨습니다! 👏
          </p>

          <div className="mt-8 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-400">
            정답률 {score}%
          </p>
        </div>

        {/* 통계 */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm text-gray-500">총 문제</p>

            <p className="mt-3 text-4xl font-bold text-gray-800">
              {totalQuestions}
            </p>
          </div>

          <div className="rounded-3xl bg-green-50 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm text-gray-500">정답</p>

            <p className="mt-3 text-4xl font-bold text-green-600">
              {correctAnswers.length}
            </p>
          </div>

          <div className="rounded-3xl bg-red-50 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm text-gray-500">오답</p>

            <p className="mt-3 text-4xl font-bold text-red-500">
              {worngAnswers.length}
            </p>
          </div>
        </div>

        {/* 오답노트 */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            📌 오답노트
          </h2>

          {worngAnswers.length === 0 ? (
            <div className="rounded-3xl bg-green-50 p-8 text-center">
              <p className="text-xl font-semibold text-green-600">
                🎉 전부 맞췄습니다!
              </p>

              <p className="mt-2 text-gray-500">
                오답노트가 없습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {worngAnswers.map((data, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <p className="mb-4 text-lg font-bold text-gray-800">
                    Q{index + 1}. {data.question}
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-xl bg-red-50 p-3">
                      <p className="font-medium text-red-500">
                        ❌ 내 답
                      </p>

                      <p className="mt-1 text-gray-700">
                        {data.selectedOption}
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-50 p-3">
                      <p className="font-medium text-green-600">
                        ✅ 정답
                      </p>

                      <p className="mt-1 text-gray-700">
                        {data.correctOption}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-3">
                      <p className="font-medium text-blue-600">
                        💡 설명
                      </p>

                      <p className="mt-1 text-gray-700">
                        {data.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-2xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition hover:scale-105 hover:bg-gray-50"
          onClick={()=>moveHome()}
          >
            홈으로
          </button>

          <button className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          onClick={()=>nav(`/exam/${result?.title}`)}
          >
            다시 풀기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;