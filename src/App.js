import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
