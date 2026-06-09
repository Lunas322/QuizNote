import type { Timestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
type ResultListCardProps = {
    id: string
    title: string
    createdAt: Timestamp
    score: number
}


function ResultListCard ({id,title,createdAt,score}:ResultListCardProps) {
    const nav = useNavigate()
    return(
             <div
              key={id}
              className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {title}
                </h2>

                <p className="text-sm text-gray-500">
                  {createdAt?.toDate().toLocaleString()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">점수</p>
                <p className="text-2xl font-bold text-blue-500">
                  {score}
                </p>
              </div>

              <button
                onClick={() => nav(`/resultlist/${id}`)}
                className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                결과 보기
              </button>
            </div>
    )
}
export default ResultListCard