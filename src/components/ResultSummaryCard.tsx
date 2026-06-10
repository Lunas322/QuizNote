type ResultSummaryCardProps = {
    id: string
    score: number
    totalCount: number
    correctCount: number
    wrongCount: number
}


function ResultSummaryCard ({id,score,totalCount,correctCount,wrongCount}:ResultSummaryCardProps) {
    return (
        <>
          <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            📊 시험 결과 상세
          </h1>

          <p className="mt-2 text-gray-500">시험 ID: {id}</p>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="text-5xl font-extrabold text-blue-500">
            {score}
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
              <p className="text-xl font-bold text-red-500">{wrongCount}</p>
            </div>
          </div>
        </div>
        </>
    )
}
export default ResultSummaryCard