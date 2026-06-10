import { useParams } from "react-router-dom";
import { useResultDetail } from "../hooks/useResultDetail";
import AnswerCard from "../components/AnswerCard";
import AuthGuard from "../components/AuthGuard";
import Loading from "./Loading";
import ResultSummaryCard from "../components/ResultSummaryCard";

function ResultDetail() {
  const { id } = useParams();
  const { resultDetail,loading} = useResultDetail(id ?? "");
  const correctCount = resultDetail?.correctAnswers.length ?? 0;
  const wrongCount = resultDetail?.wrongAnswers.length ?? 0;
  const totalCount = correctCount + wrongCount;

  if(loading) return <Loading/>

  return (
    <AuthGuard>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
      <ResultSummaryCard id={id ?? ''} totalCount={totalCount} correctCount={correctCount} wrongCount={wrongCount} score={resultDetail?.score ?? 0} />

        <div className="mt-8 space-y-4">
          {resultDetail?.correctAnswers.map((correct, index) => {
            return (
              <AnswerCard
                correctOption={correct.correctOption}
                type="correct"
                index={index}
                selectedOption={correct.selectedOption}
                question={correct.question}
                explanation={correct.explanation}
              />
            );
          })}
          {resultDetail?.wrongAnswers.map((wrong, index) => {
            return (
               <AnswerCard
                correctOption={wrong.correctOption}
                type="wrong"
                index={index}
                selectedOption={wrong.selectedOption}
                question={wrong.question}
                explanation={wrong.explanation}
              />
            );
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
    </AuthGuard>
  );
}

export default ResultDetail;
