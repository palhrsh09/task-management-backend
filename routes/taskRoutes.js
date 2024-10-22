const express = require('express');
const router = express.Router();
const Task = require('../model/task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get tasks' });
    }
  });

// Create a new task
router.post('/', async (req, res) => {
    const { title } = req.body;
  
    try {
      const newTask = new Task({ title, status: 'pending' }); // Default to pending
      await newTask.save();
      res.json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add task' });
    }
  });

// Update a task
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, status },
        { new: true }
      );
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });

// Delete a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Task.findByIdAndDelete(id);
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });

router.put("/:id/status",async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Find the task and update its status
      const task = await Task.findByIdAndUpdate(
        id,
        { status }, // Update only the status
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;