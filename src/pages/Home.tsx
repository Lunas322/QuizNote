import { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Loading from "./Loading";
import TextAddButton from "../components/TextAddButton";
import HomeInput from "../components/HomeInput";
import AuthGuard from "../components/AuthGuard";
import { useHomeSubmit } from "../hooks/useHomeSubmit";

function Home() {
  const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [showModal, setShowModal] = useState(false);

const handleShowModal = () => {
  setShowModal((prev) => !prev);
};

const { loading, submit } = useHomeSubmit({
  title,
  content,
  onSuccess: () => {
    setTitle("");
    setContent("");
    setShowModal(true);
  },
});

  if (loading) return <Loading />;

  return (
    <AuthGuard>
      <Header />

      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">
              📚 QuizNote
            </h1>

            <p className="mt-2 text-gray-500">
              공부한 내용을 입력하면 입력 데이터 기반으로 문제를 만들어드립니다
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <HomeInput
              title={title}
              content={content}
              setTitle={setTitle}
              setContent={setContent}
            />

            <TextAddButton
              textLength={content.length}
              content={content}
              title={title}
              onClick={submit}
            />
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            입력한 내용을 기반으로 시험 문제를 자동 생성합니다
          </p>
        </div>

        {showModal && (
          <Modal
            otherButton={false}
            title="저장 완료"
            text="작성 내용이 성공적으로 저장되었습니다."
            onclick={handleShowModal}
          />
        )}
      </div>
    </AuthGuard>
  );
}

export default Home;