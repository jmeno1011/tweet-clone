import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserObj } from "../component/App";
import Tweet from "../component/Tweet";
import TweetFactory from "../component/TweetFactory";
import { dbService } from "../firebaseInit";

type HomeProps = {
  userObj?: UserObj | null;
}

type TweetType = {
  attachmentUrl: string;
  createdAt: number;
  creatorId: string;
  id: string;
  text: string;
}

function Home({ userObj }: HomeProps) {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  const getTweet = async () => {
    const collectionRef = collection(dbService, "tweets");
    const dbTweets = await getDocs(collectionRef);
    dbTweets.forEach((document: any) => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      };
      console.log("getTweet:", tweetObject)
      // setTweets(tweets.concat(tweetObject));
      setTweets((prev) => [...prev, tweetObject]);
    });
  };

  useEffect(() => {
    getTweet();
    onSnapshot(collection(dbService, "tweets"), (document) => {
      const tweetArray: TweetType[] = document.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  return (
    <>
      <TweetFactory userObj={userObj} />
      <hr
        style={{
          width: "100%",
          marginBottom: 12,
          border: 0,
          borderBottom: "1px solid white",
        }}
      />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userName={userObj?.displayName}
            isOwner={tweet.creatorId === userObj?.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
