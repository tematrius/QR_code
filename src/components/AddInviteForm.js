import React, { useState } from "react";
import { db } from "../firebase"; // Firebase configuration
import { collection, doc, setDoc } from "firebase/firestore"; // Import correct de Firestore
import { QRCodeCanvas } from "qrcode.react"; // Pour générer le QR Code
import { v4 as uuidv4 } from "uuid"; // Pour générer un ID unique pour chaque invité

const AddInviteForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [qrCodeURL, setQrCodeURL] = useState("");

  // Fonction pour ajouter un invité dans Firestore et générer un QR Code
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Génération d'un ID unique pour cet invité
      const inviteId = uuidv4();
      const inviteData = {
        name,
        email,
        event,
        qrCodeURL: `https://votre-app.com/invite/${inviteId}`,
        status: "pending", // Statut initial
        createdAt: new Date(),
      };

      // Ajout de l'invité dans Firestore (correction de la méthode)
      await setDoc(doc(collection(db, "invitations"), inviteId), inviteData);

      // Génération du QR Code unique
      setQrCodeURL(`https://votre-app.com/invite/${inviteId}`);

      // Effacer les champs du formulaire après l'envoi
      setName("");
      setEmail("");
      setEvent("");

      alert("Invitation ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Erreur lors de l'ajout !");
    }
  };

  return (
    <div>
      <h3>Ajouter un invité</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de l'invité"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email de l'invité"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Événement"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          required
        />
        <button type="submit">Ajouter l'invité</button>
      </form>

      {qrCodeURL && (
        <div>
          <h4>QR Code généré pour {name}</h4>
          <QRCodeCanvas value={qrCodeURL} size={200} />
        </div>
      )}
    </div>
  );
};

export default AddInviteForm;
