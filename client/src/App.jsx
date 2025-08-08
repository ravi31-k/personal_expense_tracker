// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute token={token}>
              <Dashboard token={token} />
            </PrivateRoute>
          }
        />

        {/* Redirect default route to dashboard if logged in */}
        <Route
          path="/"
          element={
            token ? (
              <Dashboard token={token} />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
