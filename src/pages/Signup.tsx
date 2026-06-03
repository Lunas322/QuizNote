import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase";
import React, { useState } from "react";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthSpan from "../components/AuthSpan";
import AuthLayout from "../components/AuthLayout";
import AuthLabel from "../components/AuthLabel";
import { validation } from "../utils/validation";
import type { User } from "../types/authType";
import { FirebaseError } from "firebase/app";

function Signup() {
  const nav = useNavigate();
  const auth = getAuth(app);
  function isFirebaseError(error: unknown): error is FirebaseError {
    return error instanceof FirebaseError;
  }
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
    userName: "",
  });

  const [rePassword, setRePassword] = useState<string>("");

  const [error, setError] = useState({
    email: false,
    password: false,
    userName: false,
    rePassword: false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newError = validation(userData, rePassword);
    setError(newError);
    if (
      newError.email ||
      newError.password ||
      newError.userName ||
      newError.rePassword
    ) {
      return;
    }

    try {
     const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      await updateProfile(userCredential.user,{
        displayName: userData.userName
      })
      nav('/')
    } catch (error) {
      if (isFirebaseError(error)) {
        if (error.code === "auth/email-already-in-use") {
          alert("사용중인 이메일 입니다");
        } else {
          alert("알 수 없는 오류입니다");
        }
      }
    }
  };

  return (
    <AuthLayout title="회원가입" span="QuizNote를 시작해보세요">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <AuthLabel
            htmlFor="userName"
            label="이름"
            error={error.userName}
            errorMessage="이름을 입력해주세요"
          >
            <AuthInput
              id="userName"
              type="text"
              placeholder="이름을 입력하세요"
              error={error.userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, userName: e.target.value })
              }
            />
          </AuthLabel>
        </div>

        <div>
          <AuthLabel
            htmlFor="email"
            label="이메일"
            error={error.email}
            errorMessage="이메일을 확인해주세요"
          >
            <AuthInput
              id="email"
              type="email"
              placeholder="ex@gmail.com"
              error={error.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </AuthLabel>
        </div>

        <div>
          <AuthLabel
            htmlFor="password"
            label="비밀번호"
            error={error.password}
            errorMessage="비밀번호를 확인해주세요 (6자리)"
          >
            <AuthInput
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요 6자리"
              error={error.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </AuthLabel>
        </div>

        <div>
          <AuthLabel
            htmlFor="confirmPassword"
            label="비밀번호 확인"
            error={error.rePassword}
            errorMessage="비밀번호가 다릅니다 (6자리)"
          >
            <AuthInput
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              error={error.rePassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRePassword(e.target.value)
              }
            />
          </AuthLabel>
        </div>

        <AuthButton text="회원가입" />
      </form>

      <AuthSpan
        text="이미 계정이 있으신가요?"
        buttonText="로그인"
        onClick={() => nav("/login")}
      />
    </AuthLayout>
  );
}

export default Signup;
