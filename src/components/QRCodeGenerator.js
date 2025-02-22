import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("https://localhost:5174");

  return (
    <div className="qr-generator">
      <h2>Générateur de QR Code</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrez un texte ou un lien"
      />
      <QRCodeCanvas value={text} size={200} />
    </div>
  );
};

export default QRCodeGenerator;
