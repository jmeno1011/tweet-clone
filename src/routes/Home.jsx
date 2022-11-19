import Tweet from "component/Tweet";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { dbService } from "firebaseInit";
import { useEffect, useState } from "react";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = collection(dbService, "tweets");
    await addDoc(collectionRef, {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment(null);
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
        <input type={"file"} accept="image/*" onChange={onFileChange} />
        <input type={"submit"} value="tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
