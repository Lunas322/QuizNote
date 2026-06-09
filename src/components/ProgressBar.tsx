type ProgressBarProps = {
  questionCount: number;
  maxCount: number;
};

function ProgressBar({ questionCount, maxCount }: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-sm text-gray-500">
        <span>진행률</span>
        <span>
          {questionCount} / {maxCount}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{
            width: `${(questionCount / maxCount) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
export default ProgressBar;
