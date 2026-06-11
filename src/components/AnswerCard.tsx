type AnswerCardProps = {
  type: "correct" | "wrong";
  index: number;
  question?: string;
  selectedOption?: string;
  correctOption?: string;
  explanation?: string;
};

function AnswerCard({
  type,
  index,
  question,
  selectedOption,
  correctOption,
  explanation,
}: AnswerCardProps) {
  const bgColor = type === "correct" ? "bg-green-100" : "bg-red-100";

  const label = type === "correct" ? "정답" : "오답";

  const textColor = type === "correct" ? "text-green-600" : "text-red-500";
  const answerBoxColor = type === "correct" ? "bg-green-50" : "bg-red-50";

  return (
    <div
      className={`rounded-3xl border border-gray-100 p-6 shadow-sm transition hover:shadow-lg ${bgColor}`}
    >
      <p className="mb-4 text-lg font-bold text-gray-800">
        {label} Q{index + 1}. {question}
      </p>

      <div className="space-y-3">
        <div className={`rounded-xl ${answerBoxColor} p-3`}>
          <p className={`font-medium ${textColor}`}>👤 내 답</p>

          <p className="mt-1 text-gray-700">{selectedOption}</p>
        </div>

        <div className="rounded-xl bg-green-50 p-3">
          <p className="font-medium text-green-600">✅ 정답</p>

          <p className="mt-1 text-gray-700">{correctOption}</p>
        </div>

        <div className="rounded-xl bg-blue-50 p-3">
          <p className="font-medium text-blue-600">💡 설명</p>

          <p className="mt-1 text-gray-700">{explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
