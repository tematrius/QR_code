import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { BrowserQRCodeSvgWriter } from "@zxing/library"; // Importation correcte

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "invitations"));
        const guestData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuests(guestData);
      } catch (error) {
        console.error("Erreur lors de la récupération des invités :", error);
      }
    };

    fetchGuests();
  }, []);

  const generateQRCode = (url) => {
    const qrWriter = new BrowserQRCodeSvgWriter();
    const qrSvg = qrWriter.write(url, 200, 200);
    return qrSvg.outerHTML;
  };

  return (
    <div className="guests-list">
      <h2>Liste des invités</h2>
      <div className="guests-container">
        {guests.length === 0 ? (
          <p>Aucun invité trouvé.</p>
        ) : (
          guests.map((guest) => (
            <div className="guest-item" key={guest.id}>
              <h3>{guest.name}</h3>
              <p>Email: {guest.email}</p>
              <p>Status: {guest.scanned ? "Scanné" : "Non scanné"}</p>
              <div
                className="qr-code"
                dangerouslySetInnerHTML={{ __html: generateQRCode(guest.url) }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuestList;
