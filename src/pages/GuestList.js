import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles.css";

const GuestList = () => {
  const [guests, setGuests] = useState([]);

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
        console.error("Erreur lors de la récupération des invités :", error);
      }
    };

    fetchGuests();
  }, []);

  return (
    <div className="guests-list">
      <h2>Liste des invités</h2>
      <div className="guests-container">
        {guests.length === 0 ? (
          <p>Aucun invité trouvé.</p>
        ) : (
          guests.map((guest) => (
            <div className="guest-item" key={guest.id}>
              <h3>{guest.nom}</h3>
              <p>Email: {guest.email}</p>
              <p>Status: {guest.status}</p>
              <div className="qr-code">
                <img src={guest.url} alt="QR Code" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuestList;
