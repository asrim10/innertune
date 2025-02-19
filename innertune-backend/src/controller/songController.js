import Song from '../model/songSchema.js';
import cloudinary from 'cloudinary';
import multer from 'multer';

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files temporarily on the server
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Give the file a unique name
  }
});

// Use multer.fields() to accept multiple files (audio and image)
const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 },  // Image file
  { name: 'audio', maxCount: 1 }   // Audio file
]);

// Add song with Cloudinary upload
const addSong = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err });
      }

      // Ensure files are uploaded
      if (!req.files || !req.files.image || !req.files.audio) {
        return res.status(400).json({ message: 'Image and audio files are required' });
      }

      // Upload Image to Cloudinary
      const imageUploadResult = await cloudinary.v2.uploader.upload_stream(
        { folder: 'songs_images' }, // Optional folder name
        async (error, imageResult) => {
          if (error) throw error;

          // Upload Audio to Cloudinary
          cloudinary.v2.uploader.upload_stream(
            { resource_type: 'video', folder: 'songs_audio' }, // 'video' supports audio files
            async (error, audioResult) => {
              if (error) throw error;

              // Store in PostgreSQL
              const { title, album, duration } = req.body;
              const newSong = await Song.create({
                title,
                album,
                duration,
                image_url: imageResult.secure_url, // Save image URL
                audio_url: audioResult.secure_url, // Save audio URL
              });

              return res.status(201).json({ message: 'Song added successfully', song: newSong });
            }
          ).end(req.files.audio[0].buffer); // Pass buffer for audio
        }
      ).end(req.files.image[0].buffer); // Pass buffer for image
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error adding song', error: error.message });
    }
  });
};


const listSong = async (req, res) => {
  try {
    // Fetch all songs from the database
    const songs = await Song.findAll();

    // If no songs are found
    if (!songs || songs.length === 0) {
      return res.status(404).json({ message: 'No songs found' });
    }

    // Return the songs in the response
    return res.status(200).json({ message: 'Songs retrieved successfully', songs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving songs', error: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByPk(id);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    await song.destroy();
    return res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting song', error: error.message });
  }
}

export { addSong, listSong , deleteSong };