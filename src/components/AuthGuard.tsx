import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import Loading from "../pages/Loading";
import NotLogin from "../pages/NotLogin";

type AuthGuardProps = {
  children: ReactNode;
};

function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <NotLogin />;

  return <>{children}</>;
}

export default AuthGuard;