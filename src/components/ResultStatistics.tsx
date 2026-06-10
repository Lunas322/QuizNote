type ResultStatistics = {
    totalQuestions: number
    correctAnswers: number
    wrongAnswers : number

}

function ResultStatistics ({totalQuestions,correctAnswers,wrongAnswers}:ResultStatistics) {
    return (

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
              {correctAnswers}
            </p>
          </div>

          <div className="rounded-3xl bg-red-50 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm text-gray-500">오답</p>

            <p className="mt-3 text-4xl font-bold text-red-500">
              {wrongAnswers}
            </p>
          </div>
        </div>
    )
}
export default ResultStatistics