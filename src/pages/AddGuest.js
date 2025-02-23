import { useState } from "react";
import { addInvitation } from "../services/invitationService";
import { useNavigate } from "react-router-dom";

const AddGuest = () => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const navigate = useNavigate();

  const handleAddGuest = async (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    await addInvitation(guestName, guestEmail);
    alert("Invitation ajoutée avec succès !");
    setGuestName("");
    setGuestEmail("");
    navigate("/dashboard");
  };

  return (
    <div className="add-guest">
      <h2>Ajouter un invité</h2>
      <form onSubmit={handleAddGuest}>
        <input
          type="text"
          placeholder="Nom de l'invité"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email de l'invité"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddGuest;
