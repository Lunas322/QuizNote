
type AnswerBoxProps = {
  index: number;
  currentAnswer: number|undefined;
  option: string;
  questionCount: number;
  onChange: ()=>void
};

function AnswerBox({
  index,
  questionCount,
  currentAnswer,
  onChange,
  option,
}: AnswerBoxProps) {
  return (
    <label
      key={index}
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50"
    >
      <input
        type="radio"
        name={`question-${questionCount - 1}-${index}`}
        value={index}
        checked={currentAnswer == index}
        onChange={onChange}
      />

      <span>{option}</span>
    </label>
  );
}
export default AnswerBox;
