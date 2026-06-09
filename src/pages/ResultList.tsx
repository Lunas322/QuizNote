import { useNavigate } from "react-router-dom";
import { useResultList } from "../hooks/useResultList";
import Loading from "./Loading";
import Header from "../components/Header";
import { getAuth } from "firebase/auth";
import NotLogin from "./NotLogin";

function ResultList() {
  const nav = useNavigate();
  const { resultList, loading } = useResultList();
  const auth = getAuth()
  if (loading) return <Loading />;
  if (!auth.currentUser) return<NotLogin/>
  return (
<>
        <Header/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
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
              <div
              key={data.id}
              className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {data.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {data.createdAt?.toDate().toLocaleString()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">점수</p>
                <p className="text-2xl font-bold text-blue-500">
                  {data.score}
                </p>
              </div>

              <button
                onClick={() => nav(`/resultlist/${data.id}`)}
                className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                결과 보기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
          </>
  );
}

export default ResultList;