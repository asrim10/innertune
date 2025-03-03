import express from "express";
import playlistController from "../controller/playlistController.js";
import upload from "../middleware/multer.js";
import Playlist from "../model/playlistSchema.js";
import Song from "../model/songSchema.js";

const playlistRouter = express.Router();

// Add song to playlist
playlistRouter.post("/add-song", async (req, res) => {
  const { playlistId, songId } = req.body;

  if (!playlistId || !songId) {
    return res.status(400).json({ error: "Playlist ID and Song ID are required" });
  }

  try {
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist || !song) {
      return res.status(404).json({ error: "Playlist or Song not found" });
    }

    // Add the song to the playlist (this assumes there's a Many-to-Many relationship between playlists and songs)
    await playlist.addSong(song);

    res.status(200).json({ message: "Song added to playlist successfully" });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new playlist
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

// Get all playlists
playlistRouter.get("/", playlistController.getPlaylists);

// Get a single playlist by id
playlistRouter.get("/:id", playlistController.getPlaylistById);

// Update a playlist
playlistRouter.put("/:id", upload.single("image"), playlistController.updatePlaylist);

// Delete a playlist
playlistRouter.delete("/:id", playlistController.deletePlaylist);

export default playlistRouter;
