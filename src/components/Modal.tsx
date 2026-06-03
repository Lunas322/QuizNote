
type ModalProps = {
    title: string
    text: string
    onclick: ()=>void
}

function Modal({ title, text, onclick }: ModalProps) {
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

        <button
          className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
          onClick={onclick}
        >
          확인
        </button>
      </div>
    </div>
  );
}
export default Modal