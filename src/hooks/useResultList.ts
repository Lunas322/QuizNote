import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebase";
import type { ResultListData } from "../types/resultList";

export function useResultList() {
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState<ResultListData[]>([]);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return setResultList([]);
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "result"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...(doc.data() as Omit<ResultListData, "id">),
          };
        });

        setResultList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return {
    loading,
    resultList,
  };
}
