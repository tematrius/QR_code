import { useState } from "react";
import * as XLSX from "xlsx";
import { addInvitation } from "../services/invitationService";
import { useNavigate } from "react-router-dom";

const ImportExcel = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleImport = async () => {
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
  
      let successCount = 0;
      let errorCount = 0;
  
      for (let row of data) {
        if (row.Nom && row.Email) {
          await addInvitation(row.Nom, row.Email);
          successCount++;
        } else {
          errorCount++;
        }
      }
  
      // Affichage des messages après le traitement de tous les invités
      if (successCount > 0) {
        alert(`${successCount} invités ajoutés avec succès !`);
        navigate("/dashboard");
      }
  
      if (errorCount > 0) {
        alert(`${errorCount} lignes étaient invalides et n'ont pas été importées.`);
        navigate("/import-excel");
      }
    };
  
    reader.readAsBinaryString(file);
  };
  

  return (
    <div className="import-excel">
      <h2>Importer un fichier Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleImport} disabled={!file}>Importer</button>
    </div>
  );
};

export default ImportExcel;
