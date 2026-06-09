import { useResultList } from "../hooks/useResultList";
import Loading from "./Loading";
import Header from "../components/Header";
import AuthGuard from "../components/AuthGuard";
import ResultListCard from "../components/ResultListCard";

function ResultList() {
  const { resultList, loading } = useResultList();
  if (loading) return <Loading />;
  return (
    <AuthGuard>
        <Header/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            📊 시험 기록
          </h1>
          <p className="mt-2 text-gray-500">
            지금까지 응시한 시험 목록입니다.
          </p>
        </div>

        <div className="space-y-5">
          {resultList.map((data) => (
         <ResultListCard title={data.title ?? ''} score={data.score} createdAt={data.createdAt} id={data.id}/>
          ))}
        </div>
      </div>
    </div>
          </AuthGuard>
  );
}

export default ResultList;