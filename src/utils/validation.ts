import type { User } from "../types/authType";

export function validation(userData: User, rePassword: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;
  return {
    email: !userData.email || !emailRegex.test(userData.email),
    password: !userData.password || !passwordRegex.test(userData.password),
    userName: !userData.userName?.trim(),
    rePassword: userData.password !== rePassword,
  };
}
