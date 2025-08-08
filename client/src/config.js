// src/config.js
console.log("Env Backend URL:", process.env.REACT_APP_BACKEND_URL);
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
