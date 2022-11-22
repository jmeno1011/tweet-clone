import Tweet from "component/Tweet";
import TweetFactory from "component/TweetFactory";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { dbService } from "firebaseInit";
import { useEffect, useState } from "react";

function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  const getTweet = async () => {
    const collectionRef = collection(dbService, "tweets");
    const dbTweets = await getDocs(collectionRef);
    dbTweets.forEach((document) => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [...prev, tweetObject]);
    });
  };

  useEffect(() => {
    getTweet();
    onSnapshot(collection(dbService, "tweets"), (document) => {
      const tweetArray = document.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
