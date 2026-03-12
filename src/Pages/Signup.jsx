import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import { signupUser } from "../services/api";


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) =>{
         e.preventDefault();
        try {
            const res = await signupUser({email, password});
            // store id, email and token returned from backend
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/home");
        } catch (err) {
            alert(err.response?.data?.message || "SignUp Failed")
        }

    };
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Sign up to report campus issues</p>

        <form onSubmit={handleSignup} className="auth-form">
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup
