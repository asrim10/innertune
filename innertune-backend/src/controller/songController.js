import Song from "../model/songSchema.js";

// Function to add a new song
export const addSong = async (req, res) => {
  const { title, image_url, album, duration, audio_url } = req.body;

  try {
    const newSong = await Song.create({
      title,
      image_url,
      album,
      duration,
      audio_url,
    });
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to list all songs
export const listSong= async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a song by ID
export const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findByPk(id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    await song.destroy();
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};