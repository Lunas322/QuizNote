import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";

type UseHomeSubmitProps = {
  title: string;
  content: string;
  onSuccess: () => void;
};

export function useHomeSubmit({
  title,
  content,
  onSuccess,
}: UseHomeSubmitProps) {
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const submit = async () => {
    if (loading) return;

    const user = auth.currentUser;

    if (!user) return;

    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "studyContents"), {
        uid: user.uid,
        title,
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submit,
  };
}
