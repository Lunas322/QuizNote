import { useEffect, useState } from "react";
import Header from "../components/Header";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import SelectBox from "../components/SelectBox";
import { usePostStore } from "../store/usePostData";
import CountSelectBox from "../components/CountSelectBox";
import Modal from "../components/Modal";

type studyDataType = {
  id: string;
  content: string;
  title: string;
  uid: string;
};

function TestSelect() {
  const postData = usePostStore((state)=> state.postData)
  const auth = getAuth();
  const [studyData, setStudyData] = useState<studyDataType[]>([]);
  const [showModal,setShowModal] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const user = auth.currentUser;
      if (!user) return;
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
    };
    getData();
  }, []);


  const handelShowMoal = () => setShowModal(!showModal);

  const handelPostAi = () => {
    if (!postData.content || !postData.count) {
      setShowModal(!showModal)
      return
    } console.log('ai전송',postData)
  }
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">
              📝 시험 생성
            </h1>

            <p className="mt-2 text-gray-500">
              시험에 사용할 공부 내용을 선택해주세요
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                📚 공부 내용 선택
              </h2>

              <div className="space-y-3">
                {studyData.map((data) => (
                  <SelectBox
                    title={data.title}
                    id={data.id}
                    key={data.id}
                    content={data.content}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                🔢 문제 수 선택
              </h2>

              <div className="grid grid-cols-4 gap-3">
                {[5, 10, 15, 20].map((number) => (
                 <CountSelectBox number={number} key={number}/>
                ))}
              </div>
            </div>
            <button className="mt-8 w-full rounded-xl bg-blue-500 py-4 text-lg font-semibold text-white transition hover:bg-blue-600"
            onClick={handelPostAi}>
              시험 시작하기
            </button>
          </div>
        </div>

        {showModal && (
          <Modal
            title="시험 응시가 불가능합니다"
            text="문제와 문제수를 선택해주세요."
            onclick={handelShowMoal}
          />
        )}
      </div>
    </>
  );
}

export default TestSelect;
