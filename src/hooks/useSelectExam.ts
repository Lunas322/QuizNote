import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { useAuth } from "./useAuth";
type studyDataType = {
  id: string;
  content: string;
  title: string;
  uid: string;
};
export function useSelectExam() {
  const [studyData, setStudyData] = useState<studyDataType[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "studyContents"),
          where("uid", "==", user.uid),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<studyDataType, "id">),
        }));

        setStudyData(data);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [user]);

  return { studyData, loading };
}
