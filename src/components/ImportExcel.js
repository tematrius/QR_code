import React, { useState } from "react";
import * as XLSX from "xlsx"; // Importation de la bibliothèque pour traiter les fichiers Excel
import { db } from "../firebase"; // Firebase configuration
import { v4 as uuidv4 } from "uuid"; // Pour générer un ID unique

const ImportExcel = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  // Fonction pour gérer l'upload du fichier Excel
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Fonction pour lire le fichier Excel et ajouter les invités dans Firestore
  const handleFileUpload = async () => {
    if (!file) {
      setStatus("Veuillez sélectionner un fichier Excel.");
      return;
    }

    // Lire le fichier Excel
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Extraire les données de la première feuille du fichier
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Traitement des données et ajout dans Firestore
      for (let i = 0; i < jsonData.length; i++) {
        const { name, email, event } = jsonData[i];

        if (name && email && event) {
          const inviteId = uuidv4();
          const inviteData = {
            name,
            email,
            event,
            qrCodeURL: `https://votre-app.com/invite/${inviteId}`,
            status: "pending", // Statut initial
            createdAt: new Date(),
          };

          // Ajout de l'invité dans Firestore
          await db.collection("invitations").doc(inviteId).set(inviteData);
        }
      }

      setStatus("Invités importés avec succès !");
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h3>Importer un fichier Excel</h3>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Importer</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ImportExcel;
