import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { authService, dbService } from "firebaseInit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ userObj }) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  /** 
   * 
   getData(){
     const q = query(collection(db, "cities"), where("capital", "==", true));
   
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
     });
   }
  */
  // const getMyTweet = async () => {
  //   const collectionRef = collection(dbService, "tweets");
  //   const q = query(
  //     collectionRef,
  //     where("creatorId", "==", userObj.uid),
  //     orderBy("createdAt", "desc")
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   });
  // };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      console.log(userObj.updateProfile);
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  // useEffect(() => {
  //   getMyTweet();
  // }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type={"text"}
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value={"Update Profile"} />
      </form>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
}

export default Profile;
