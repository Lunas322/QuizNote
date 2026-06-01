import type { ReactNode } from "react";

type AuthLabelProps = {
  label: string;
  error: boolean;
  errorMessage: string;
  children: ReactNode;
  htmlFor: string;
};

function AuthLabel({
  label,
  error,
  errorMessage,
  children,
  htmlFor,
}: AuthLabelProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor={htmlFor}>
          {label}
        </label>
        {children}
        {error && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    </>
  );
}
export default AuthLabel;
