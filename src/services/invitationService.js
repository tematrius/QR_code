import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export const addInvitation = async (guestName, guestEmail) => {
  try {
    // Ajouter un invité et récupérer l'ID
    const docRef = await addDoc(collection(db, "invitations"), {
      name: guestName,
      email: guestEmail,
      scanned: false,
    });

    // Génération de l'URL d'invitation
    const invitationURL = `http://localhost:3001/check-in/${docRef.id}`;

    // Mise à jour du document Firestore avec l'URL
    await updateDoc(doc(db, "invitations", docRef.id), {
      url: invitationURL,
    });

    console.log("Invitation ajoutée avec ID :", docRef.id, "URL :", invitationURL);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'invitation :", error);
  }
};
