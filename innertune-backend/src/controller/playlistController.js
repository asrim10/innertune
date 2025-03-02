import Playlist from "../model/playlistSchema.js";

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Use multer's file path

    const newPlaylist = await Playlist.create({
      name,
      description,
      image_url: imageUrl,
    });

    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all playlists
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single playlist by ID
export const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findByPk(id);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a playlist
export const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const playlist = await Playlist.findByPk(id);
    
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    // Check if a new image was uploaded
    if (req.file) {
      playlist.image_url = req.file.path;
    }

    playlist.name = name || playlist.name;
    playlist.description = description || playlist.description;

    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a playlist
export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findByPk(id);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    await playlist.destroy();
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { createPlaylist, getPlaylists, getPlaylistById, updatePlaylist, deletePlaylist };
