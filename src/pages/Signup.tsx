import { useNavigate } from "react-router-dom";

function Signup() {
    const nav = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          회원가입
        </h1>

        <p className="mb-8 text-center text-gray-500">
          QuizNote를 시작해보세요
        </p>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              이름
            </label>

            <input
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              이메일
            </label>

            <input
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              비밀번호
            </label>

            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              비밀번호 확인
            </label>

            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?
          <button className="ml-1 font-semibold text-blue-500 hover:underline" onClick={()=>nav('/login')}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;