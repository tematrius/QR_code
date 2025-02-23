import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/guest-list">Liste des invités</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
