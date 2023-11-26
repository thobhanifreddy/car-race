import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
// Function to add a new user to the 'user' collection

export interface User {
  username: string;
  status: string;
  lastActive: Date;
}
export async function addUser(userData: User): Promise<void> {
  try {
    const docRef = await addDoc(collection(firestore, "user"), userData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to update user status
export async function updateUserStatus(
  userId: string,
  status: string
): Promise<void> {
  const userRef = doc(firestore, "user", userId);
  await updateDoc(userRef, {
    status: status,
    lastActive: new Date(),
  });
}

// Function to retrieve user data
export async function getUserData(
  userId: string
): Promise<DocumentData | null> {
  const userRef = doc(firestore, "user", userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}
