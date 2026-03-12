import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { getAllIssues } from "../services/api";

function Home() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllIssues();
        setIssues(res.data || []);
      } catch (err) {
        // keep silent — UI will show zeros
      }
    };
    fetch();
  }, []);

  const total = issues.length;
  const pending = issues.filter(i => (i.status || "").toLowerCase() === "pending").length;
  const resolved = issues.filter(i => (i.status || "").toLowerCase() === "resolved").length;

  return (
    <div className="container">
      <div className="dashboard-card">
        <h1>Campus Issue Tracker</h1>
        <p>Manage campus problems easily</p>

        <div className="stats">
          <div className="stat-panel">
            <div className="stat-box">
              <div className="stat-label">📄 Total Issues</div>
              <span className="stat-number">{total}</span>
            </div>
            <ul className="stat-list">
              {issues.map((issue) => (
                <li key={issue._id} className="stat-list-item">
                  <div className="stat-list-title">{truncate(issue.title, 60)}</div>
                  <div className="stat-list-meta">{issue.category}</div>
                </li>
              ))}
              {issues.length === 0 && <li className="stat-list-item">No issues</li>}
            </ul>
          </div>

          <div className="stat-panel">
            <div className="stat-box">
              <div className="stat-label">⏳ Pending</div>
              <span className="stat-number">{pending}</span>
            </div>
            <ul className="stat-list">
              {issues.filter(i => (i.status || "").toLowerCase() === "pending").map((issue) => (
                <li key={issue._id} className="stat-list-item">
                  <div className="stat-list-title">{truncate(issue.title, 60)}</div>
                  <div className="stat-list-meta">{issue.category}</div>
                </li>
              ))}
              {issues.filter(i => (i.status || "").toLowerCase() === "pending").length === 0 && <li className="stat-list-item">No pending issues</li>}
            </ul>
          </div>

          <div className="stat-panel">
            <div className="stat-box">
              <div className="stat-label">✅ Resolved</div>
              <span className="stat-number">{resolved}</span>
            </div>
            <ul className="stat-list">
              {issues.filter(i => (i.status || "").toLowerCase() === "resolved").map((issue) => (
                <li key={issue._id} className="stat-list-item">
                  <div className="stat-list-title">{truncate(issue.title, 60)}</div>
                  <div className="stat-list-meta">{issue.category}</div>
                </li>
              ))}
              {issues.filter(i => (i.status || "").toLowerCase() === "resolved").length === 0 && <li className="stat-list-item">No resolved issues</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

function truncate(s, n) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
