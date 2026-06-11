import { usePostStore } from "../store/usePostData";

type CountSelectBoxProps = {
  number: number;
};

function CountSelectBox({ number }: CountSelectBoxProps) {
  const postData = usePostStore((state) => state.postData);
  const setPostData = usePostStore((state) => state.setPostData);
  return (
    <label
      key={number}
      className={`cursor-pointer rounded-xl border p-3 text-center font-semibold transition
        ${
          postData.count === number
            ? "border-blue-500 bg-blue-50 text-blue-600"
            : "border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500"
        }`}
    >
      <input
        type="radio"
        name="question-count"
        value={number}
        className="hidden"
        checked={postData.count === number}
        onChange={() =>
          setPostData({
            ...postData,
            count: number,
          })
        }
      />
      {number}문제
    </label>
  );
}
export default CountSelectBox;
