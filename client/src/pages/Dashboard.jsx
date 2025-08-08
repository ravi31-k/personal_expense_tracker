import React, { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Charts from "../components/Charts";

export default function Dashboard({ token }) {
  const [refreshData, setRefreshData] = useState(false);

  const triggerRefresh = () => setRefreshData(prev => !prev);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <ExpenseForm token={token} onExpenseAdded={triggerRefresh} />
        </div>
        <div className="col-md-6">
          <ExpenseList token={token} refreshData={refreshData} onDelete={triggerRefresh} />
        </div>
      </div>
      <div className="mt-4">
        <Charts token={token} refreshData={refreshData} />
      </div>
    </div>
  );
}
