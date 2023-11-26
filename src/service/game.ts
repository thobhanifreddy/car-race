import { firestore } from "../firebase.config";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";

export interface Game {
  name: string;
  createdBy: string;
  createdAt: Date;
  participants: string[];
  isActive: boolean;
}
export async function createGame(gameData: Game): Promise<string | undefined> {
  try {
    const docRef = await addDoc(collection(firestore, "game"), gameData);
    console.log("Game created with ID: ", docRef.id);
    return docRef.id; // Return the game ID
  } catch (e) {
    console.error("Error creating game: ", e);
    return undefined;
  }
}

export function onGameUpdate(
  gameId: string,
  callback: (data: DocumentData) => void
) {
  const gameRef = doc(firestore, "game", gameId);
  return onSnapshot(gameRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      console.log("No such game!");
    }
  });
}

export async function updateGame(
  gameId: string,
  updateData: Partial<Game>
): Promise<void> {
  const gameRef = doc(firestore, "game", gameId);
  await updateDoc(gameRef, updateData);
}
