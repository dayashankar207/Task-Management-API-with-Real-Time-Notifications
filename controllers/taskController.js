import * as TaskModel from "../models/taskModel.js";
import redis from "../config/redis.js";

export async function createTask(req, res) {
  try {
    const { title, description, assignedTo } = req.body;
    const createdBy = req.user.id; // from auth middleware

    const task = await TaskModel.createTask(
      title,
      description,
      assignedTo,
      createdBy
    );

    await redis.publish(
      "tasks",
      JSON.stringify({
        event: "task_created",
        data: task,
      })
    );

    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const task = await TaskModel.updateTask(
      id,
      title,
      description,
      assignedTo,
      status
    );

    await redis.publish(
      "tasks",
      JSON.stringify({
        event: "task_updated",
        data: task,
      })
    );

    res.json(task);
  } catch (err) {
    console.error("Error updating task", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const task = await TaskModel.deleteTask(id);

    await redis.publish(
      "tasks",
      JSON.stringify({
        event: "task_deleted",
        data: task,
      })
    );

    res.json(task);
  } catch (err) {
    console.error("Error deleting task", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllTasks(req, res) {
  try {
    const tasks = await TaskModel.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMyTasks(req, res) {
  try {
    const tasks = await TaskModel.getTasksByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching user tasks", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
