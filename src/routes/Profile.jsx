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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  /*
  const q = query(collection(db, "cities"), where("capital", "==", true));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  */
  const getMyTweet = async () => {
    const collectionRef = collection(dbService, "tweets");
    const q = query(
      collectionRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    // const tweet = await getDocs(collectionRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyTweet();
  }, []);
  return (
    <div>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
}

export default Profile;
