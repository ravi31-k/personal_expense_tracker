const Expense = require("../models/Expense");

// Get all expenses for logged-in user
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
};

// Add new expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const newExpense = new Expense({
      title,
      amount,
      category,
      date,
      userId: req.user.id
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Error adding expense", error: err.message });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense", error: err.message });
  }
};

module.exports = { getExpenses, addExpense, deleteExpense };
