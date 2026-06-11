type HomeInputProps = {
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

function HomeInput({
  title,
  content,
  setTitle,
  setContent,
}: HomeInputProps) {
  return (
    <>
      <label className="mb-3 block text-sm font-semibold text-gray-700">
        제목
      </label>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="예: React Hooks 정리"
        className="mb-6 w-full rounded-2xl border border-gray-200 p-5 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <label className="mb-3 block text-sm font-semibold text-gray-700">
        공부중인 내용 입력
      </label>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="예: React의 useState는 상태를 관리하는 Hook이다..."
        className="h-72 w-full resize-none rounded-2xl border border-gray-200 p-5 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </>
  );
}

export default HomeInput;