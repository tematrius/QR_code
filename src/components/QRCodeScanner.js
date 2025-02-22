import { useState, useRef } from "react";
import { BrowserMultiFormatReader } from '@zxing/library';
import './QRCodeScanner.css'; // Assurez-vous que le chemin est correct


const QRCodeScanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState("");
  const videoRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  let codeReader = useRef(null);

  const startScanner = () => {
    codeReader.current = new BrowserMultiFormatReader();
    codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
      if (result) {
        setScanResult(result.text);
        if (onScan) onScan(result.text); // Appel de la fonction callback avec le résultat
      }
      if (error && !(error instanceof Error)) {
        console.error(error);
      }
    });
    setIsScanning(true);
  };

  const stopScanner = () => {
    if (codeReader.current) {
      codeReader.current.reset(); // Arrêter le scanner
    }
    setIsScanning(false);
  };

  return (
    <div>
      <h2>Scanner QR Code</h2>
      <div>
        <video ref={videoRef} width="100%" height="auto" />
        {!isScanning ? (
          <button onClick={startScanner}>Démarrer le scanner</button>
        ) : (
          <button onClick={stopScanner}>Arrêter le scanner</button>
        )}
      </div>
      <p>Résultat du scan: {scanResult}</p>
    </div>
  );
};

export default QRCodeScanner;

