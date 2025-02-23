import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import AddGuest from "./pages/AddGuest";
import ImportExcel from "./pages/ImportExcel";
import GuestList from "./pages/GuestList"; // Import de la page de récupération



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/check-in/:id" element={<CheckIn />} />
      <Route path="/add-guest" element={<AddGuest />} />
      <Route path="/import-excel" element={<ImportExcel />} />
      <Route path="/guest-list" element={<GuestList />} /> {/* Nouvelle route */}
    </Routes>
  );
};

export default AppRoutes;
