import type { ReactNode } from "react"

type AuthLayoutProps = {
    title: string
    span: string
    children: ReactNode
}

function AuthLayout ({title,span,children}:AuthLayoutProps) {
    return(
        <>
          <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">{title}</h1>

        <p className="mb-8 text-center text-gray-500">
          {span}
        </p>
        {children}
        </div>
        </div>
        </>
    )
}
export default AuthLayout