import { useNavigate } from "react-router-dom"

function NotLogin () {
    const nav = useNavigate()
    return (
        <>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-6">
  <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
    
    <div className="mb-6 flex justify-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
        🔒
      </div>
    </div>

    <h1 className="mb-3 text-3xl font-bold text-gray-800">
      로그인이 필요합니다
    </h1>

    <p className="mb-8 leading-relaxed text-gray-500">
      QuizNote의 문제 생성, 문제 풀이, 오답노트 기능을 이용하려면
      먼저 로그인해주세요.
    </p>

    <div className="flex flex-col gap-3">
      <button className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
      onClick={()=>nav('/login')}>
        로그인
      </button>

      <button className="w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
      onClick={()=>nav('/signup')}
      >
        회원가입
      </button>
    </div>
  </div>
</div>
        </>
    )
}
export default NotLogin