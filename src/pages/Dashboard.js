import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-buttons">
        <div className="dashboard-card" onClick={() => navigate("/add-guest")}>
          <i className="fas fa-user-plus"></i>
          <span>Ajouter un invité</span>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/import-excel")}>
          <i className="fas fa-file-excel"></i>
          <span>Importer un fichier Excel</span>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
