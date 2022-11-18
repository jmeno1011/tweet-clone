import { useState } from "react";

function Home() {
  const [tweet, setTweet] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
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
