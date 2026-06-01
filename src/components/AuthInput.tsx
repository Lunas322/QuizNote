import type React from "react";

type AuthInputProps = {
  error: boolean;
  type: string;
  placeholder: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function AuthInput({ error, onChange, type, placeholder, id }: AuthInputProps) {
  return (
    <>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full rounded-lg border ${
          error ? "border-red-600" : "border-gray-300"
        } px-4 py-3 outline-none transition focus:border-blue-500 `}
        onChange={onChange}
      />
    </>
  );
}

export default AuthInput;
