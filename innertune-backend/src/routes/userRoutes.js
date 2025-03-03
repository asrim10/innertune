import { createUser, updateUser, deleteUser, getUserById } from "../controller/userController.js";
import express from "express";

const userRouter = express.Router();

// Route to fetch all users
userRouter.get("/user", async (req, res) => {
  try {
    const users = await users.findAll(); // Corrected the reference to 'Users' model
    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// Existing routes
userRouter.post("/add", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUserById);

export default userRouter;
