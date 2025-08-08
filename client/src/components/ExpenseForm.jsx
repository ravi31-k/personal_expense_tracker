import React, { useState } from "react";
import axios from "axios";

const categoryOptions = [
  { label: "🍔 Food", value: "Food" },
  { label: "🚗 Transport", value: "Transport" },
  { label: "🛍️ Shopping", value: "Shopping" },
  { label: "🩺 Health", value: "Health" },
  { label: "📄 Bills", value: "Bills" },
  { label: "🔧 Other", value: "Other" },
];

export default function ExpenseForm({ token, onExpenseAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.amount || !formData.date) {
      setError("All fields are required.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in. Please log in again.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/expenses",
        { ...formData, userId }, // Include userId
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormData({
        title: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
      });

      setSuccess("Expense added successfully!");
      setError("");
      onExpenseAdded();
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error("Add expense error:", err);
      setError("Failed to add expense. Try again.");
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h5 className="mb-3">💸 Add New Expense</h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="e.g. Lunch, Uber Ride"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount (₹)</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <button type="submit" className="btn btn-primary w-100 mt-2">
          ➕ Add Expense
        </button>
      </form>
    </div>
  );
}
