import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate()
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          QuizNote
        </h1>

        <p className="mb-8 text-center text-gray-500">
          로그인하고 문제를 생성해보세요
        </p>

        <form className="space-y-4">
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

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          계정이 없으신가요?
          <button className="ml-1 font-semibold text-blue-500 hover:underline" onClick={()=>nav('/signup')}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;