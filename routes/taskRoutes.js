import express from "express";
import * as TaskController from "../controllers/taskController.js";
import { auth } from "../middlewares/auth.js";

import {
  taskMutationLimiter,
  taskReadLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post(
  "/",
  auth(["user", "admin"]),
  taskMutationLimiter,
  TaskController.createTask
);
router.get(
  "/all",
  auth(["user", "admin"]),
  taskReadLimiter,
  TaskController.getAllTasks
);
router.get(
  "/my",
  auth(["user", "admin"]),
  taskReadLimiter,
  TaskController.getMyTasks
);

router.put(
  "/:id",
  auth(["admin"]),
  taskMutationLimiter,
  TaskController.updateTask
);
router.delete(
  "/:id",
  auth(["admin"]),
  taskMutationLimiter,
  TaskController.deleteTask
);

export default router;
