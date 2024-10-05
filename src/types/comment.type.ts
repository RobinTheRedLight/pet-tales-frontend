export interface Comment {
  _id: string;
  postId: string;
  userEmail: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
