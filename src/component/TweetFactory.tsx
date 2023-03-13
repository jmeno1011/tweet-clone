import { Icon } from "@iconify/react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "../firebaseInit";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TweetFactory.css";
import { UserObj } from "../types";

type TweetFactoryProps = {
  userObj?: UserObj;
}

function TweetFactory({ userObj }: TweetFactoryProps) {
  const [tweet, setTweet] = useState<string>("");
  const [attachment, setAttachment] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const storageRef = ref(storageService, `${userObj?.uid}/${uuidv4()}`);
      await uploadString(storageRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(storageRef);
    }
    const tweetData = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
      attachmentUrl,
    };
    const collectionRef = collection(dbService, "tweets");

    await addDoc(collectionRef, tweetData);
    setTweet("");
    setAttachment("");
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const theFile = files![0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      // console.log(result);
      setAttachment(result as string);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment("");
  };
  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <div className="form-input">
        <input
          type={"text"}
          placeholder="what's on your mind"
          maxLength={120}
          onChange={onChange}
          value={tweet}
        />
      </div>
      <div className="form-footer">
        <div>
          <label htmlFor="upload-file" className="upload-btn">
            <Icon icon="ic:outline-broken-image" />
          </label>
          <input
            type={"file"}
            id="upload-file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
        </div>
        <input className="tweet-btn" type={"submit"} value="tweet" />
      </div>
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
}

export default TweetFactory;
