// backend/controllers/todoController.js
import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim())
      return res.status(400).json({ message: "Text is required" });
    const todo = await Todo.create({ text: text.trim() });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // allow partial updates
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Deleted", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
