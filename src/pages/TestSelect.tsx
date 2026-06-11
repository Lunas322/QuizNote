import { useState } from "react";
import Header from "../components/Header";
import SelectBox from "../components/SelectBox";
import CountSelectBox from "../components/CountSelectBox";
import Modal from "../components/Modal";
import PostButton from "../components/PostButton";
import AuthGuard from "../components/AuthGuard";
import { useSelectExam } from "../hooks/useSelectExam";
import { useGetExam } from "../hooks/useGetExam";
import Loading from "./Loading";

function TestSelect() {
  const [showModal,setShowModal] = useState(false)
  const {loading,studyData} = useSelectExam()
  const [modalTitle,setModalTitle] = useState("")
  const [modalText,setModalText] = useState("")
  const {handlePostAi,buttonLoading} = useGetExam({setShowModal,loading,setModalText,setModalTitle})

  if (loading) return <Loading/>

  return (
    <>
    <AuthGuard>
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
              <PostButton onClick={handlePostAi} loading={buttonLoading}/>
          </div>
        </div>

        {showModal && (
          <Modal
          otherButton={false}
            title={modalTitle}
            text={modalText}
            onclick={()=>setShowModal(false)}
          />
        )}
      </div>
      </AuthGuard>
    </>
  );
}

export default TestSelect;
