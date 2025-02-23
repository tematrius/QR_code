import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Importer la configuration Firebase
import { collection, getDocs } from "firebase/firestore";
import QRCode from "react-qr-code"; // Importer la bibliothèque pour générer les QR codes

const DisplayGuests = () => {
  const [guests, setGuests] = useState([]);

  // Récupérer les données depuis Firestore
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "invitations"));
        const guestData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGuests(guestData);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchGuests();
  }, []);

  return (
    <div className="guests-list">
      <h2>Liste des invités</h2>
      <div className="guests-container">
        {guests.map((guest) => (
          <div className="guest-item" key={guest.id}>
            <h3>{guest.nom}</h3>
            <p>Email: {guest.email}</p>
            <p>Status: {guest.status}</p>
            <div className="qr-code">
              <QRCode value={guest.url} size={128} /> {/* Génère le code QR à partir de l'URL */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGuests;
