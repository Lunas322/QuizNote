import type { ResultListData } from "../types/resultList"

type UserResultSummaryProps = {
    resultList: ResultListData[]
    score: number
    totalQuestionCount: number

}

function UserResultSummary ({resultList,score,totalQuestionCount}:UserResultSummaryProps) {

    return(
            <div className="mb-8 grid grid-cols-3 gap-4">

      <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
        <p className="text-sm text-gray-500">
          응시 시험
        </p>

        <p className="mt-2 text-3xl font-bold text-blue-600">
          {resultList.length}
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
        <p className="text-sm text-gray-500">
          평균 점수
        </p>

        <p className="mt-2 text-3xl font-bold text-green-600">
        {score}
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 text-center shadow-lg">
        <p className="text-sm text-gray-500">
          총 문제
        </p>

        <p className="mt-2 text-3xl font-bold text-purple-600">
          {totalQuestionCount}
        </p>
      </div>

    </div>
    )
}
export default UserResultSummary