import { useParams } from "react-router-dom";
import { useResultDetail } from "../hooks/useResultDetail";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import NotLogin from "./NotLogin";

function ResultDetail() {
  const { id } = useParams();
  const { resultDetail } = useResultDetail(id ?? "");
  const correctCount = resultDetail?.correctAnswers.length ?? 0;
  const worngCount = resultDetail?.worngAnswers.length ?? 0;
  const totalCount = correctCount + worngCount;
  const auth = getAuth()
  useEffect(() => {
    console.log(resultDetail);
  }, [resultDetail]);
  if(!auth.currentUser) return <NotLogin/>
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            📊 시험 결과 상세
          </h1>

          <p className="mt-2 text-gray-500">시험 ID: {id}</p>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="text-5xl font-extrabold text-blue-500">
            {resultDetail?.score}
          </div>

          <div className="mt-4 flex justify-center gap-10 text-sm text-gray-500">
            <div>
              <p>총 문제</p>
              <p className="text-xl font-bold text-gray-800">{totalCount}</p>
            </div>

            <div>
              <p>정답</p>
              <p className="text-xl font-bold text-green-500">{correctCount}</p>
            </div>

            <div>
              <p>오답</p>
              <p className="text-xl font-bold text-red-500">{worngCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {resultDetail?.correctAnswers.map((correct, index) => {
            return (
             <div
                  key={index}
                  className="rounded-3xl border border-gray-100 bg-green-100 p-6 shadow-sm transition hover:shadow-lg"
                >
                  <p className="mb-4 text-lg font-bold text-gray-800">
                   정답 Q{index + 1}. {correct.question}
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-xl bg-red-50 p-3">
                      <p className="font-medium text-red-500">
                        ❌ 내 답
                      </p>

                      <p className="mt-1 text-gray-700">
                        {correct.selectedOption}
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-50 p-3">
                      <p className="font-medium text-green-600">
                        ✅ 정답
                      </p>

                      <p className="mt-1 text-gray-700">
                        {correct.correctOption}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-3">
                      <p className="font-medium text-blue-600">
                        💡 설명
                      </p>

                      <p className="mt-1 text-gray-700">
                        {correct.explanation}
                      </p>
                    </div>
                  </div>
                </div>)
          })}
          {resultDetail?.worngAnswers.map((worng,index)=>{
            return(
                 <div
                  key={index}
                  className="rounded-3xl border border-gray-100 bg-red-100 p-6 shadow-sm transition hover:shadow-lg"
                >
                  <p className="mb-4 text-lg font-bold text-gray-800">
                    오답 Q{index + 1}. {worng.question}
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-xl bg-red-50 p-3">
                      <p className="font-medium text-red-500">
                        ❌ 내 답
                      </p>

                      <p className="mt-1 text-gray-700">
                        {worng.selectedOption}
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-50 p-3">
                      <p className="font-medium text-green-600">
                        ✅ 정답
                      </p>

                      <p className="mt-1 text-gray-700">
                        {worng.correctOption}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-3">
                      <p className="font-medium text-blue-600">
                        💡 설명
                      </p>

                      <p className="mt-1 text-gray-700">
                        {worng.explanation}
                      </p>
                    </div>
                  </div>
                </div>
            )
          })}
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100">
            목록으로
          </button>

          <button className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600">
            다시 풀기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultDetail;
