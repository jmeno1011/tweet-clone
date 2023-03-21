import { collection, getDocs, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
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

  useEffect(() => {
    const collectionRef = collection(dbService, "tweets");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const tweetArray: TweetType[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      } as TweetType));
      setTweets((prev) => [...prev, ...tweetArray]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {
        userObj && <TweetFactory userObj={userObj} />
      }
      <div>
        {tweets && tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userName={userObj!.displayName}
            email={userObj.email}
            isOwner={tweet.creatorId === userObj!.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
