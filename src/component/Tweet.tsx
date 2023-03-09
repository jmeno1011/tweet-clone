import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../firebaseInit";
import { TweetType } from "../routes/Home";
import "./Tweet.css";

type TweetProps = {
  tweetObj: TweetType;
  userName?: string | null;
  isOwner?: boolean | null;
}

function Tweet({ tweetObj, userName, isOwner }: TweetProps) {
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
          <h3>@name : {userName}</h3>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              height="50px"
              width={"50px"}
              alt=""
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Tweet;
