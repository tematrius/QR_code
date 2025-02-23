import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRCodeScanner = () => {
  const [scannedData, setScannedData] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let selectedDeviceId;

    // Obtenir la liste des caméras et utiliser la première disponible
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          selectedDeviceId = videoInputDevices[0].deviceId;
          return codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result, err) => {
              if (result) {
                setScannedData(result.getText());
              }
            }
          );
        }
      })
      .catch((err) => console.error(err));

    return () => codeReader.reset();
  }, []);

  return (
    <div className="qr-scanner">
      <h2>Scanner un QR Code</h2>
      <video ref={videoRef} style={{ width: "100%", maxWidth: "300px" }} />
      <p>Résultat : {scannedData || "Aucun QR Code scanné"}</p>
    </div>
  );
};

export default QRCodeScanner;
