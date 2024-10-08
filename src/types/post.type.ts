export type TPostCategory = "Tip" | "Story";

export type CreatePostFormInputs = {
  title: string;
  content: string;
  category: TPostCategory;
  images: FileList;
  isPremium: boolean;
};

export interface Post {
  _id: string;
  title: string;
  content: string;
  category: TPostCategory;
  images: string[];
  author: string;
  isPremium: boolean;
  isPublishable: boolean;
  upvoteCount: number;
  downvoteCount: number;
  createdAt: string;
  updatedAt: string;
}
