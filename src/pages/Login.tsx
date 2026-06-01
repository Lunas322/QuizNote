import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import type React from "react";
import { useState } from "react";
import type { User } from "../types/authType";
import AuthLayout from "../components/AuthLayout";
import AuthLabel from "../components/AuthLabel";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthSpan from "../components/AuthSpan";

function Login() {
  const nav = useNavigate();
  const auth = getAuth(app);

  const [login, setLogin] = useState<User>({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newError = {
      email: !login.email,
      password: !login.password,
    };
    setError(newError);
    if (newError.email || newError.password) return;
    try {
      await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password,
      );
      alert("로그인 성공!");
    } catch {
      alert("이메일 또는 비밀번호가 올바르지 않습니다");
    }
  };
  return (
    <AuthLayout title="QuizNote" span="로그인하고 문제를 생성해보세요">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <AuthLabel
            htmlFor="email"
            label="이메일"
            error={error.email}
            errorMessage="이메일을 입력하세요"
          >
            <AuthInput
              id="email"
              type="email"
              error={error.email}
              placeholder="example@email.com"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLogin({ ...login, email: e.target.value })
              }
            />
          </AuthLabel>
        </div>

        <div>
          <AuthLabel
            htmlFor="password"
            label="비밀번호"
            error={error.password}
            errorMessage="비밀번호를 입력하세요"
          >
            <AuthInput
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              error={error.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLogin({ ...login, password: e.target.value })
              }
            />
          </AuthLabel>
        </div>
        <AuthButton text="로그인" />
      </form>

      <AuthSpan
        text="계정이 없으신가요?"
        buttonText="회원가입"
        onClick={() => nav("/signup")}
      />
    </AuthLayout>
  );
}

export default Login;
