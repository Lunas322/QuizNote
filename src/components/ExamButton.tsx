import type { ResultData } from "../types/resultType"

type Functions ={
beforeQuestionCount: ()=> void
moveResult: ()=>void
nextQuestionCount: ()=>void
}

type ExamButtonProps = {
    questionCount: number
    maxCount: number
    resultData: ResultData
    functions : Functions
}



function ExamButton ({questionCount,maxCount,resultData,functions}:ExamButtonProps) {
      const disabledStyle = "bg-gray-200 text-gray-500 rounded-xl px-6 py-3 font-semibold"
  const activeStyle = "bg-blue-500 text-white  hover:bg-blue-600 rounded-xl px-6 py-3 font-semibold"
    return(
                 <div className="mt-8 flex justify-between">
            <button
              disabled={questionCount == 0}
              className={questionCount == 1 ? disabledStyle : activeStyle}
              onClick={() => functions.beforeQuestionCount()}
            >
              이전
            </button>
            {resultData.userAnswer.length == maxCount && maxCount == questionCount ? (
              <button
                className={activeStyle}
                onClick={() => functions.moveResult()}
              >
                제출하기
              </button>
            ) : (
              <button
              disabled= {questionCount == maxCount}
                className={questionCount  == maxCount ? disabledStyle : activeStyle}
                onClick={() => functions.nextQuestionCount()}
              >
                다음 문제
              </button>
            )}
          </div>
    )
}
export default ExamButton