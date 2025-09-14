import express from "express";
import * as TaskController from "../controllers/taskController.js";
import { auth } from "../middlewares/auth.js"; 

const router = express.Router();


router.post("/", auth, TaskController.createTask); 
router.get("/", auth, TaskController.getAllTasks);
router.get("/my", auth, TaskController.getMyTasks);
router.put("/:id", auth, TaskController.updateTask); 
router.delete("/:id", auth, TaskController.deleteTask); 

export default router;
