import { createUser, updateUser, deleteUser, getUserById, getUsers } from "../controller/userController.js";
import express from "express";

const userRouter = express.Router();

// Existing routes
userRouter.post("/add", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUserById);
userRouter.get("/users", getUsers);

export default userRouter;
