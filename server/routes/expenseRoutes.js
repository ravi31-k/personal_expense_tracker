const express = require("express");
const router = express.Router();
const { getExpenses, addExpense, deleteExpense } = require("../controllers/expenseController");
const { verifyToken } = require("../middleware/authMiddleware");

// Routes
router.get("/", verifyToken, getExpenses);
router.post("/", verifyToken, addExpense);
router.delete("/:id", verifyToken, deleteExpense);

module.exports = router;
