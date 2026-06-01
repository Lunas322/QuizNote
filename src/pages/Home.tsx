import { useState } from "react";

function Home() {
  const [content, setContent] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            📚 QuizNote
          </h1>
          <p className="mt-2 text-gray-500">
            공부한 내용을 입력하면 입력 데이터 기반으로 문제를 만들어드립니다
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <label className="mb-3 block text-sm font-semibold text-gray-700">
            공부중인 내용 입력
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="예: React의 useState는 상태를 관리하는 Hook이다..."
            className="h-72 w-full resize-none rounded-2xl border border-gray-200 p-5 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              글자 수: {content.length}
            </p>

            <button
              className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={!content.trim()}
            >
              문제 생성하기
            </button>
          </div>
        </div>


        <p className="mt-6 text-center text-sm text-gray-400">
          입력한 내용을 기반으로 시험 문제를 자동 생성합니다
        </p>
      </div>
    </div>
  );
}

export default Home;