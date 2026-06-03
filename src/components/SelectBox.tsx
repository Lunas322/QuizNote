
import { usePostStore } from "../store/usePostData";

type SelectBoxProps = {
  title: string;
  id: string;
  content: string
};

function SelectBox({
  id,
  title,
  content
}: SelectBoxProps) {
    const postData = usePostStore((state)=>state.postData)
    const setPostData = usePostStore((state)=>state.setPostData)


  return (
    <label
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-blue-500"
      id={id}
    >
      <input
        type="radio"
        name="select-box"
        value={id}
        checked={content === postData.content}
        onChange={() => setPostData({content: content})}
      />
      <span>{title}</span>
    </label>
  );
}
export default SelectBox;
