import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { addInvitation } from "../services/invitationService";

const QRCodeGenerator = () => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerateQR = async () => {
    if (!guestName.trim() || !guestEmail.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Vérification basique de l'email
    if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setError(""); // Reset l'erreur si tout est bon
    setCopied(false); // Reset l'état de copie

    try {
      const invitationId = await addInvitation(guestName, guestEmail);
      const qrUrl = `${window.location.origin}/check-in/${invitationId}?name=${encodeURIComponent(
        guestName
      )}&email=${encodeURIComponent(guestEmail)}`;
      setQrValue(qrUrl);
    } catch (err) {
      setError("Erreur lors de la génération du QR Code.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="qr-generator">
      <h2>Générer une Invitation QR</h2>

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

      {error && <p className="error-message">{error}</p>}

      <button onClick={handleGenerateQR}>Générer</button>

      {qrValue && (
        <div className="qr-result">
          <QRCodeSVG value={qrValue} size={200} />
          <p>{qrValue}</p>
          <button onClick={handleCopy}>
            {copied ? "Copié !" : "Copier le lien"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
