import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import AddGuest from "./pages/AddGuest";
import ImportExcel from "./pages/ImportExcel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/check-in/:id" element={<CheckIn />} />
      <Route path="/add-guest" element={<AddGuest />} />
      <Route path="/import-excel" element={<ImportExcel />} />
    </Routes>
  );
};

export default AppRoutes;
