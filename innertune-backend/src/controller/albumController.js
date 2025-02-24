import Album from "../model/albumSchema.js";

// Function to add a new album
const addAlbum = async (req, res) => {
  try {
    const { name, bgColor, description } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const albumData = await Album.create({
      name,
      bgColor,
      description,
      image: `/uploads/${image.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Album added successfully!",
      album: albumData,
    });
  } catch (error) {
    console.error("Error adding album:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add album.",
      error: error.message,
    });
  }
};

// Function to list all albums
const listAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.status(200).json({
      message: "Albums retrieved successfully!",
      albums: albums,
    });
  } catch (error) {
    console.error("Error retrieving albums:", error);
    res.status(500).json({
      message: "Failed to retrieve albums.",
      error: error.message,
    });
  }
};

// Function to delete an album by ID
const removeAlbum = async (req, res) => {
  try {
    const { id } = req.body; // Get id from request body
    if (!id) {
      return res.status(400).json({ message: "Album ID is required" });
    }

    const album = await Album.findByPk(id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    await album.destroy();
    res.status(200).json({ success: true, message: "Album deleted successfully!" });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).json({
      message: "Failed to delete album.",
      error: error.message,
    });
  }
};


export { addAlbum, listAlbums, removeAlbum };