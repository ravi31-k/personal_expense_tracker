import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({ token, refreshData }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error("Chart fetch error:", err);
      }
    };

    if (token) fetchExpenses();
  }, [token, refreshData]);

  const grouped = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Expense Amount",
        data: Object.values(grouped),
        backgroundColor: [
          "#0d6efd", "#198754", "#ffc107", "#dc3545", "#6c757d", "#20c997", "#6610f2"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 15,
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.toFixed(2)}`
        }
      }
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ height: "350px" }}>
      <h5 className="mb-3">📊 Expense Distribution</h5>
      {Object.keys(grouped).length > 0 ? (
        <div style={{ height: "250px" }}>
          <Pie data={data} options={options} />
        </div>
      ) : (
        <p className="text-muted">No data to display.</p>
      )}
    </div>
  );
}
