import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { addInvitation } from "../services/invitationService";

const QRCodeGenerator = () => {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerateQR = async () => {
    if (!guestName || !email) return;
    const invitationId = await addInvitation(guestName, email);
    setQrValue(`http://localhost:3001/check-in/${invitationId}`);
  };

  return (
    <div>
      <h2>Générer une Invitation QR</h2>
      <input
        type="text"
        placeholder="Nom de l'invité"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleGenerateQR}>Générer</button>
      {qrValue && <QRCodeSVG value={qrValue} size={200} />}
    </div>
  );
};

export default QRCodeGenerator;
