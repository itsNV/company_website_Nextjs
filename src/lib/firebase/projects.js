import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

export async function getProjects() {
  const q = query(
    collection(db, "projects"),
    where("is_published", "==", true),
    orderBy("featured", "desc"),
    orderBy("created_at", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}