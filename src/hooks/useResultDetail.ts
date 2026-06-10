import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { ResultDetail } from "../types/resultDetail";

export function useResultDetail(id: string) {
  const [loading, setLoading] = useState(false);
  const [resultDetail, setResultDetail] = useState<ResultDetail | null>(null);

  const auth = getAuth();

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return setResultDetail(null);
      }

      setLoading(true);

      try {
        const docRef = doc(db, "result", id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setResultDetail(snapshot.data() as ResultDetail);
        } else {
          setResultDetail(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [id]);

  return {
    loading,
    resultDetail,
  };
}
