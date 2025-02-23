import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/add-guest")}>Ajouter un invité</button>
      <button onClick={() => navigate("/import-excel")}>Importer un fichier Excel</button>
    </div>
  );
};

export default Dashboard;
