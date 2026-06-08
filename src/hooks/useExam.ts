import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import type { ExamQuestion } from "../types/examType";
export function useExam(title: string) {
  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState<ExamQuestion[]>([]);

  const auth = getAuth();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "quizzes"),
          where("uid", "==", user.uid),
          where("title", "==", title),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ExamQuestion, "id">),
        }));
        console.log(data);
        setExam(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [title]);
  return {
    exam,
    loading,
  };
}
