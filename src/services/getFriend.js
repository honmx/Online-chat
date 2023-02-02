import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const getFriend = async (currentUser) => {
  const snapshot = await getDocs(collection(db, "users"));
  
  let friend = null;

  snapshot.forEach(item => {
    const user = item.data();
    if (currentUser.uid !== user.uid) friend = user;
  })

  return friend;
}

export {getFriend};