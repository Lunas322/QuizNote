

type AuthSpanProps = {
    text: string
    buttonText: string
    onClick: ()=>void
}

function AuthSpan ({text,buttonText,onClick}:AuthSpanProps) {
    return(
        <>
                <div className="mt-6 text-center text-sm text-gray-500">
          {text}
          <button
            className="ml-1 font-semibold text-blue-500 hover:underline"
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
        </>
    )
}
export default AuthSpan