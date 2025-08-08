// ExpenseList.jsx (Updated)
import React, { useEffect, useState } from "react";
import axios from "axios";

const categoryColors = {
  Food: "primary",
  Transport: "success",
  Shopping: "warning",
  Health: "danger",
  Bills: "secondary",
  Other: "info",
};

function formatAmount(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ExpenseList({ token, refreshData, onDelete }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Fetch expenses failed:", err);
      }
    };

    fetchExpenses();
  }, [token, refreshData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      onDelete(); // Also refresh chart
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="card p-3 shadow-sm glass-card">
      <h5 className="mb-3">📋 Your Expenses</h5>
      {expenses.length === 0 ? (
        <p className="text-muted">No expenses yet. Start adding some!</p>
      ) : (
        <ul className="list-group">
          {expenses.map((exp) => (
            <li
              key={exp._id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{exp.title}</div>
                <span className={`badge bg-${categoryColors[exp.category] || "dark"} me-2`}>
                  {exp.category}
                </span>
                <small className="text-muted">📅 {formatDate(exp.date)}</small>
              </div>
              <div className="text-end">
                <div className="fw-semibold text-success">{formatAmount(exp.amount)}</div>
                <button
                  className="btn btn-sm btn-outline-danger mt-1"
                  onClick={() => handleDelete(exp._id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
