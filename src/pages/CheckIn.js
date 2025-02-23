import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const CheckIn = () => {
  const { id } = useParams();
  const [guest, setGuest] = useState(null);
  const [status, setStatus] = useState("Vérification en cours...");

  useEffect(() => {
    const checkInvitation = async () => {
      const docRef = doc(db, "invitations", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const guestData = docSnap.data();
        setGuest(guestData);

        if (!guestData.scanned) {
          await updateDoc(docRef, { scanned: true });
          setStatus(`Bienvenue, ${guestData.name} !`);
        } else {
          setStatus("Ce QR Code a déjà été scanné !");
        }
      } else {
        setStatus("Invitation introuvable !");
      }
    };

    checkInvitation();
  }, [id]);

  return (
    <div className="check-in">
      <h2>Vérification de l'invitation</h2>
      <p>{status}</p>
    </div>
  );
};

export default CheckIn;
