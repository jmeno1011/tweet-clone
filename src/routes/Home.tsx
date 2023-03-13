import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tweet from "../component/Tweet";
import TweetFactory from "../component/TweetFactory";
import { dbService } from "../firebaseInit";
import { TweetType, UserObj } from "../types";

type HomeProps = {
  userObj?: UserObj | null;
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
      {
        userObj && <TweetFactory userObj={userObj} />
      }
      <hr
        style={{
          width: "100%",
          marginBottom: 12,
          border: 0,
          borderBottom: "1px solid white",
        }}
      />
      <div>
        {/* {tweets && tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userName={userObj?.displayName}
            isOwner={tweet?.creatorId === userObj?.uid}
          />
        ))} */}
      </div>
    </>
  );
}

export default Home;
