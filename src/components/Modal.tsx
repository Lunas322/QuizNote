
type ModalProps = {
    title: string
    text: string
    onclick: ()=>void
    onclickotherButton?: ()=>void
    otherButton: boolean
    loading?: boolean
    
}

function Modal({ title, text, onclick, onclickotherButton,otherButton,loading }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
            📚
          </div>
        </div>

        <h2 className="mb-3 text-center text-2xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="mb-8 text-center leading-relaxed text-gray-500">
          {text}
        </p>

    <div className="flex gap-2">
      <button
  disabled={loading}
  className={`w-full rounded-xl py-3 font-semibold text-white transition-all duration-200 ${
    loading
      ? "cursor-not-allowed bg-gray-400"
      : "bg-blue-500 hover:-translate-y-0.5 hover:bg-blue-600"
  }`}
  onClick={onclick}
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      처리 중...
    </span>
  ) : (
    "확인"
  )}
</button>
        {otherButton ? 
                <button
          className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600"
          onClick={onclickotherButton}
        >
          취소
        </button> : null
}
    </div>
      </div>
    </div>
  );
}
export default Modal