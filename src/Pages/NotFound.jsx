import { Link } from "react-router-dom";
import "../styles/global.css";

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Oops! Page not found</p>
        <Link to="/home" className="notfound-btn">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
