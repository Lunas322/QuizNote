import { useResultList } from "../hooks/useResultList";
import Header from "../components/Header";
import { calculateAverageScore } from "../utils/calculateAverageScore";
import { calculateTotalQuestionCount } from "../utils/calculateTotalQuestionCount";
import MyExamCard from "../components/MyExamCard";
import UserResultSummary from "../components/UserResultSummary";
import Loading from "./Loading";
import AuthGuard from "../components/AuthGuard";
import ProfileCard from "../components/ProfileCard";

function MyPage() {
  const { resultList, loading } = useResultList();
  const score = calculateAverageScore(resultList);
  const totalQuestionCount = calculateTotalQuestionCount(resultList);

  if (loading) return <Loading />;
  return (
    <>
      <AuthGuard>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
          <div className="mx-auto max-w-5xl">
            <ProfileCard />
            <UserResultSummary
              totalQuestionCount={totalQuestionCount}
              score={score}
              resultList={resultList}
            />

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                📚 최근 시험 기록
              </h2>

              <div className="space-y-4">
                {resultList.map((data) => (
                  <MyExamCard
                    key={data.id}
                    id={data.id}
                    title={data.title ?? ""}
                    createdAt={data.createdAt}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    </>
  );
}

export default MyPage;
