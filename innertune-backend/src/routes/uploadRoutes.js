import express from "express";
import { addAlbum, listAlbums, removeAlbum } from "../controller/albumController.js";
import upload from "../middleware/multer.js";
import { uploadFile } from "../controller/fileController.js";

const router = express.Router();

// Route for single file upload
router.post("/upload", upload.single("file"), uploadFile);

router.post("/", upload.single("image"), addAlbum);
router.get("/", listAlbums);
router.delete("/:id", removeAlbum);

export default router;
