import { useEffect, useState } from "react";
import { getAllIssues, resolveIssue, deleteIssue } from "../services/api";
import "../styles/issues.css";
import "../styles/dashboard.css";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await getAllIssues();
        setIssues(res.data || []);
      } catch (err) {
        alert("Failed to fetch issues");
      }
    };
    fetchIssues();
  }, []);

  const handleResolve = async (id) => {
    try {
      await resolveIssue(id);
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status: "resolved" } : issue
        )
      );
    } catch (err) {
      alert("Failed to resolve issue");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    try {
      await deleteIssue(id);
      setIssues((prev) => prev.filter((issue) => issue._id !== id));
    } catch (err) {
      alert("Failed to delete issue");
    }
  };

  return (
    <div className="container">
      <div className="dashboard-card">
        <h2>All Issues</h2>

        {issues.length === 0 ? (
          <p>No issues yet</p>
        ) : (
          <div className="issue-grid">
            {issues.map((issue) => (
              <div key={issue._id} className="issue-card">
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
                <p>
                  <strong>Category:</strong> {issue.category}
                </p>
                <p>
                  <small>
                    Submitted: {new Date(issue.createdAt).toLocaleString()}
                  </small>
                </p>
                <div className="issue-actions">
                  {issue.status !== "resolved" && (
                    <button
                      className="btn-resolve"
                      onClick={() => handleResolve(issue._id)}
                    >
                      Resolve
                    </button>
                  )}

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(issue._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIssues;
