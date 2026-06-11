import type { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type MyExamCardProps = {
  id: string;
  title: string;
  createdAt: Timestamp;
};

function MyExamCard({ id, title, createdAt }: MyExamCardProps) {
  const nav = useNavigate();
  const formattedDate = createdAt?.toDate()?.toLocaleDateString() ?? '날짜 정보가 없습니다'
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-5 transition hover:bg-gray-50">
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>

        <p className="text-sm text-gray-500">
          {formattedDate}
        </p>
      </div>

      <button
        className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
        onClick={() => nav(`/resultList/${id}`)}
      >
        보기
      </button>
    </div>
  );
}
export default MyExamCard;
