import { addDoc, collection } from "firebase/firestore";
import { dbService } from "firebaseInit";
import { useState } from "react";

function Home() {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = collection(dbService, "tweet");
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
    </div>
  );
}

export default Home;
