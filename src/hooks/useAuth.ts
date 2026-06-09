import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

type UseAuthReturn = {
  user: User | null;
  loading: boolean;
};

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
