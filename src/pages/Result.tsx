import { useNavigate, useParams } from "react-router-dom";
import { useResult } from "../hooks/useResult";
import { useGrading } from "../hooks/useGrading";
import Loading from "./Loading";
import { useSubmitResult } from "../hooks/useSubmitResult";
import Score from "../components/Score";
import ResultStatistics from "../components/ResultStatistics";
import WrongAnswerList from "../components/WrongAnswerList";
import AuthGuard from "../components/AuthGuard";
import { calculateResultScore } from "../utils/calculateResultScore";

function Result() {
  const { examId } = useParams();
  const nav = useNavigate();
  const { result, loading } = useResult(examId ?? "");
  const { correctAnswers, wrongAnswers } = useGrading({ result });
  const title = result?.title;
  const { moveHome } = useSubmitResult({
    examId: examId ?? "",
    correctAnswers,
    wrongAnswers,
    title: title ?? "",
  });

  const { score, totalQuestions, correctCount, wrongCount } =
    calculateResultScore({ correctAnswers, wrongAnswers });

  if (loading) return <Loading />;
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-extrabold text-gray-800">
              🎉 시험 결과
            </h1>

            <p className="mt-3 text-lg text-gray-500">시험이 완료되었습니다.</p>
          </div>

          <Score score={score} />

          <ResultStatistics
            correctAnswers={correctCount}
            wrongAnswers={wrongCount}
            totalQuestions={totalQuestions}
          />

          <WrongAnswerList wrongAnswers={wrongAnswers} />

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              className="rounded-2xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition hover:scale-105 hover:bg-gray-50"
              onClick={() => moveHome()}
            >
              홈으로
            </button>

            <button
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
              onClick={() => nav(`/exam/${result?.title}`)}
            >
              다시 풀기
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

export default Result;
