import { addSong, listSong, deleteSong } from "../controller/songController.js";
import express from "express";
import upload from "../middleware/multer.js";

const songRouter = express.Router();

// Route to add a song
songRouter.post("/add", upload.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]), addSong);

// Route to list all songs
songRouter.get("/list", listSong);

// Route to delete a song by ID (use DELETE method)
songRouter.post("/delete", deleteSong);

export default songRouter;
