export interface TweetType {
  attachmentUrl: string;
  createdAt: number;
  creatorId: string;
  text: string;
  email: string;
  nickname: string;
  id: string;
}

export interface UserObj {
  displayName: string | null;
  uid: string | null;
  email: string;
  photoURL: string | null;
}