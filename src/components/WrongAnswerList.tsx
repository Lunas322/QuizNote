import type { UserAnswer } from "../types/resultType";
import AnswerCard from "./AnswerCard";
type WrongAnswerListProps = {
    wrongAnswers: UserAnswer[]
}


function WrongAnswerList ({wrongAnswers}:WrongAnswerListProps) {
    return(
                <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">📌 오답노트</h2>

          {wrongAnswers.length === 0 ? (
            <div className="rounded-3xl bg-green-50 p-8 text-center">
              <p className="text-xl font-semibold text-green-600">
                🎉 전부 맞췄습니다!
              </p>

              <p className="mt-2 text-gray-500">오답노트가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {wrongAnswers.map((data, index) => (
                <AnswerCard
                  type="wrong"
                  correctOption={data.correctOption}
                  question={data.question}
                  explanation={data.explanation}
                  selectedOption={data.selectedOption}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
    )
}
export default WrongAnswerList