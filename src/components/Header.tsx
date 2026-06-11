import { useNavigate } from "react-router-dom";
import { logout } from "../util/logout";


function Header() {
  const nav = useNavigate()
  const handelLogout = async ()=>{
    await logout ()
    nav('/login')
  }
  return (
    <div className="w-full border-b bg-white">
      <div className="flex w-full items-center justify-between px-6 py-4">

        <div className="text-xl font-extrabold text-blue-600 transition hover:opacity-80" onClick={()=>nav('/')}>
          📚 QuizNote
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <div className="cursor-pointer transition hover:text-blue-500" onClick={()=>nav('/')}>문제 생성</div>
          <div className="cursor-pointer transition hover:text-blue-500" onClick={()=>nav('/testselect')}>문제 풀이</div>
          <div className="cursor-pointer transition hover:text-blue-500" onClick={()=>nav('/resultList')}>결과</div>
          <div className="cursor-pointer transition hover:text-blue-500" onClick={()=>nav('/my')}>마이페이지</div>
        </div>

        <div>
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
          onClick={()=>handelLogout()}>
            로그아웃
          </button>
        </div>

      </div>
    </div>
  );
}

export default Header;