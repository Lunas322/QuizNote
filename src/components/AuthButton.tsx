type AuthButtonProps = {
    text: string
}

function AuthButton ({text}:AuthButtonProps) {
    return(
                  <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            {text}
          </button>
    )
}
export default AuthButton