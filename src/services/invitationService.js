import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const addInvitation = async (guestName, guestEmail) => {
  try {
    const docRef = await addDoc(collection(db, "invitations"), {
      name: guestName,
      email: guestEmail,
      scanned: false, 
    });
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'invitation:", error);
  }
};
