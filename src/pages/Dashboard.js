import React, { useState } from "react";
import QRCodeGenerator from "../components/QRCodeGenerator";
import QRCodeScanner from "../components/QRCodeScanner";
import AddInviteForm from "../components/AddInviteForm"; // Composant d'ajout manuel d'invité
import ImportExcel from "../components/ImportExcel"; // Composant d'importation de fichier Excel

const Dashboard = () => {
  const [showAddInviteForm, setShowAddInviteForm] = useState(false);
  const [showImportExcel, setShowImportExcel] = useState(false);

  const handleScan = (data) => {
    console.log("QR Code scanné:", data);
    alert(`QR Code scanné : ${data}`);
  };

  return (
    <div>
      <h1>Tableau de Bord</h1>
      
      {/* Section Génération QR Code */}
      <div>
        <h2>Générer un QR Code</h2>
        <QRCodeGenerator />
      </div>
      
      {/* Section Scanner QR Code */}
      <div>
        <h2>Scanner un QR Code</h2>
        <QRCodeScanner onScan={handleScan} />
      </div>
      
      {/* Section Ajouter un invité */}
      <div>
        <h2>Ajouter un invité manuellement</h2>
        <button onClick={() => setShowAddInviteForm(!showAddInviteForm)}>
          {showAddInviteForm ? "Cacher le formulaire" : "Ajouter un invité"}
        </button>
        {showAddInviteForm && <AddInviteForm />}
      </div>
      
      {/* Section Importer des invités depuis un fichier Excel */}
      <div>
        <h2>Importer des invités depuis un fichier Excel</h2>
        <button onClick={() => setShowImportExcel(!showImportExcel)}>
          {showImportExcel ? "Cacher l'importation" : "Importer un fichier Excel"}
        </button>
        {showImportExcel && <ImportExcel />}
      </div>
    </div>
  );
};

export default Dashboard;
