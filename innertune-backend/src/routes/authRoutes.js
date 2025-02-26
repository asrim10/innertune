import { login, init } from "../controller/authController.js";
import express from "express"

const authRouter = express.Router();

authRouter.get("/init", init);
authRouter.post("/login", login);

export  default authRouter
