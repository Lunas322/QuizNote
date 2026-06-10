import { useEffect, useState } from "react";
import type { ResultData } from "../types/resultType";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useResult(examId: string) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);

  const auth = getAuth();

  useEffect(() => {
    if (!examId) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return setResult(null);
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "userAnswer"),
          where("uid", "==", user.uid),
          where("examId", "==", examId),
          orderBy("createdAt", "desc"),
          limit(1),
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setResult(snapshot.docs[0].data() as ResultData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [examId]);

  return {
    loading,
    result,
  };
}
