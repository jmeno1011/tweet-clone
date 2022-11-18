import { addDoc, collection, getDocs } from "firebase/firestore";
import { dbService } from "firebaseInit";
import { useEffect, useState } from "react";

function Home() {
  const [tweet, setTweet] = useState("");
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
  console.log(tweets);
  useEffect(() => {
    getTweet();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = collection(dbService, "tweets");
    await addDoc(collectionRef, { tweet, createdAt: Date.now() });
    setTweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          placeholder="what's on your mind"
          maxLength={120}
          onChange={onChange}
          value={tweet}
        />
        <input type={"submit"} value="tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
