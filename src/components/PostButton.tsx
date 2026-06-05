import { usePostStore } from "../store/usePostData"

type ButtonProps = {
    loading: boolean
    onClick: ()=> void
}

function PostButton ({loading,onClick}:ButtonProps) {
    const postData = usePostStore((state)=>state.postData)
    return(
        <button
  className={`mt-8 w-full rounded-xl py-4 text-lg font-semibold text-white transition flex items-center justify-center gap-2
  ${
    !postData.content || !postData.count || loading
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
  onClick={onClick}
  disabled={!postData.content || !postData.count || loading}
>
  {loading ? (
    <>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      생성 중...
    </>
  ) : (
    "시험 시작하기"
  )}
</button>
    )
}
export default PostButton