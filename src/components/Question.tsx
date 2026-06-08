type QuestionProps = {
    questionCount : number
    question: string
}

function Question ({question,questionCount}:QuestionProps) {
    return(
        <>
                  <div className="mb-2 text-sm font-semibold text-blue-500">
            문제 {questionCount}
          </div>

          <h2 className="mb-8 text-2xl font-bold text-gray-800">
            {question}
          </h2>
        </>
    )
}
export default Question