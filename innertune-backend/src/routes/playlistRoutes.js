import express from "express";
import playlistController from "../controller/playlistController.js";
import upload from "../middleware/multer.js";
import Playlist from "../model/playlistSchema.js";

const playlistRouter = express.Router();

playlistRouter.post("/add", upload.single("image"), async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { name, description, user_id } = req.body; // Extract user_id

  if (!name || !description || !user_id) { // Ensure user_id is included
    return res.status(400).json({ error: "Missing required fields" });
  }

 try {
  const newPlaylist = await Playlist.create({
    playlistName: name,
    playlistDesc: description,
    playlistImg: req.file ? `/uploads/${req.file.filename}` : null,
    user_id: user_id, // Ensure this is passed
  });

  console.log("Playlist saved to DB:", newPlaylist);
  res.status(201).json({ message: "Playlist created", data: newPlaylist });
} catch (error) {
  console.error("Error saving playlist:", error.message); // Log the error message
  res.status(500).json({ error: "Internal Server Error", details: error.message }); // Return error details for debugging
}

});


playlistRouter.get("/", playlistController.getPlaylists);
playlistRouter.get("/:id", playlistController.getPlaylistById);
playlistRouter.put("/:id", upload.single("image"), playlistController.updatePlaylist);
playlistRouter.delete("/:id", playlistController.deletePlaylist);

export default playlistRouter;
