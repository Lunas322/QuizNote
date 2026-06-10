type ScroeProps = {
    score: number
}

function Score ({score}:ScroeProps) {
    return(
             <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-xl">
          <div className="mb-2 text-sm font-semibold tracking-widest text-gray-400 uppercase">
            Final Score
          </div>

          <div className="mb-4 text-7xl font-black text-blue-500">
            {score}
            <span className="ml-2 text-3xl">점</span>
          </div>

          <p className="text-lg text-gray-500">
            수고하셨습니다! 👏
          </p>

          <div className="mt-8 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-400">
            정답률 {score}%
          </p>
        </div>
    )
}
export default Score