import { useState } from "react";
import { addIssue } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import "../styles/dashboard.css";

function FormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Infrastructure");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addIssue({ title, description, category });
      // success — go to all issues
      setTitle("");
      setDescription("");
      setCategory("Infrastructure");
      navigate("/all-issues");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit issue");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2 className="auth-title">Submit an Issue</h2>
        <p className="auth-subtitle">Help improve the campus by reporting problems</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Safety">Safety</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" className="auth-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
