import express from "express";
import * as TaskController from "../controllers/taskController.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth(["user", "admin"]), TaskController.createTask);
router.get("/all", auth(["user", "admin"]), TaskController.getAllTasks);
router.get("/my", auth(["user", "admin"]), TaskController.getMyTasks);

router.put("/:id", auth(["admin"]), TaskController.updateTask);
router.delete("/:id", auth(["admin"]), TaskController.deleteTask);

export default router;
