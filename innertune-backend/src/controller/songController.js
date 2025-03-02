import Song from "../model/songSchema.js";

// Function to add a new song
export const addSong = async (req, res) => {
  const { title, description, album } = req.body;
  const image = req.files["image"] ? req.files["image"][0].path : null; // Path to the image file
  const audio = req.files["audio"] ? req.files["audio"][0].path : null; // Path to the audio file

  try {
    // Check if files are uploaded
    if (!image || !audio) {
      return res.status(400).json({ error: "Image and audio are required" });
    }

    const newSong = await Song.create({
      title,
      description,
      album,
      image_url: image, // Store image path
      audio_url: audio, // Store audio path
    });

    res.status(201).json({ success: true, song: newSong });
  } catch (error) {
    console.error("Error adding song:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

// Function to list all songs
export const listSong = async (req, res) => {
  try {
    const songs = await Song.findAll();
    
    const updatedSongs = songs.map(song => ({
      ...song.dataValues,
      image_url: `http://localhost:4000/uploads/${song.image_url.replace(/^uploads[\\/]+/, "")}` // Fix duplicate 'uploads/'
    }));

    res.json(updatedSongs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};



// Function to delete a song by ID
export const deleteSong = async (req, res) => {
  const { id } = req.body;

  try {
    const song = await Song.findByPk(id); // Use the appropriate method to find by ID
    if (song) {
      await song.destroy(); // Delete the song
      return res.status(200).json({ success: true, message: "Song removed successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Song not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error occurred while deleting the song" });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();
    const updatedSongs = songs.map((song) => ({
      ...song.dataValues,
      image_url: `http://localhost:4000/uploads/${song.image_url}`,
      audio_url: `http://localhost:4000/uploads/${song.audio_url}`,
    }));
    res.json({ success: true, songs: updatedSongs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};