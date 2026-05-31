import type { ReactNode } from "react";

type AuthLabelProps = {
  label: string;
  error: boolean;
  errorMessage: string;
  children: ReactNode;
};

function AuthLabel({ label, error, errorMessage, children }: AuthLabelProps) {
  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-medium">{label}</label>
        {children}

        {error && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    </>
  );
}
export default AuthLabel;
