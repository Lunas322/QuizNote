type TextAddButtonProps = {
    textLength: number
    title: string
    content: string
    onClick:  ()=> void
}

function TextAddButton ({textLength,title,content,onClick}:TextAddButtonProps) {
    return (

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                글자 수: {textLength}
              </p>

              <button
                className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                disabled={!title.trim() || !content.trim()}
                onClick={onClick}
              >
                문제 생성하기
              </button>
            </div>
    )
}
export default TextAddButton