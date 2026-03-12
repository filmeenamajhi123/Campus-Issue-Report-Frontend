import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Campus Issues</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/form">Form</Link>
        <Link to="/all-issues">All Issues</Link>
        <button className="logout" onClick={handleLogout} aria-label="Logout">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
