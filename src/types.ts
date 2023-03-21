import { User, updateProfile } from "firebase/auth";

export interface TweetType {
  attachmentUrl: string;
  createdAt: number;
  creatorId: string;
  text: string;
  id: string;
}

interface Profile {
  displayName?: string | null;
  photoURL?: string | null;
}

export interface UserObj {
  displayName: string | null;
  uid: string | null;
}