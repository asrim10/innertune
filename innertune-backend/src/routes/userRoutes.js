import { createUser, updateUser,deleteUser ,getUserById } from "../controller/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/add", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUserById);

export default userRouter