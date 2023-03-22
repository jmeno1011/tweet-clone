import { Icon } from "@iconify/react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../firebaseInit";
import { TweetType } from "../types";
import "./Tweet.css";

type TweetProps = {
  tweetObj: TweetType;
  userName?: string | null;
  email:string;
  isOwner: boolean;
}

function Tweet({ tweetObj, userName, email, isOwner }: TweetProps) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you suer you want to delete this nweet?");
    if (ok) {
      // delete tweet
      await deleteDoc(doc(dbService, "tweets", tweetObj.id));

      // delete storage
      const deleteRef = ref(storageService, tweetObj.attachmentUrl);
      await deleteObject(deleteRef);
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateDoc(doc(dbService, "tweets", tweetObj.id), { text: newTweet });
    setEditing(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              placeholder="Edit your tweet"
              type={"text"}
              value={newTweet}
              onChange={onChange}
              required
            />
            <input type={"submit"} value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <div className="tweet">
          <div className="tweet-name">
          <h3>{userName}</h3>
          <span>@{email.split("@")[0]}</span>
          </div>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              height="100px"
              width="100px"
              alt=""
            />
          )}
          {isOwner && (
            <div className="tweet-btn-group">
              <button className="tweet-btn" onClick={toggleEditing}>
                <Icon icon="material-symbols:edit-outline" />
              </button>
              <button className="tweet-btn" onClick={onDeleteClick}>
                <Icon icon="material-symbols:delete-outline-rounded" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Tweet;
