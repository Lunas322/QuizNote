import { create } from "zustand";

type PostDataType = {
  content: string;
  count: number;
};

type PostStore = {
  postData: PostDataType;
  setPostData: (data: Partial<PostDataType>) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  postData: {
    content: "",
    count: 0,
  },

  setPostData: (data) =>
    set((state) => ({
      postData: {
        ...state.postData,
        ...data,
      },
    })),
}));
