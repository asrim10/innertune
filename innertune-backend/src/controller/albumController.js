import { v2 as cloudinary } from "cloudinary";
import Album from "../model/albumSchema.js";

const addAlbum = async (req,res) => {
    try {
        const name = req.body.name;
        const bgColor = req.body.bgColor;
        const description = req.body.description;
        const image = req.file;
        const imageUplaod = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
        const albumData = await Album.create({
            name,
            bgColor,
            description,
            image: imageUplaod.secure_url
        });

         res.status(201).json({
            message: 'Album added successfully!',
            album: albumData,
         });
        
    } catch (error) {
        console.error('Error adding album:', error);
        res.status(500).json({
            message: 'Failed to add album.',
            error: error.message,
        });
        
    }   
}

const listAlbums = async (req, res) => { 
    try {
        const albums = await Album.findAll();
        res.status(200).json({
            message: 'Albums retrieved successfully!',
            albums: albums,
        });
    } catch (error) {
        console.error('Error retrieving albums:', error);
        res.status(500).json({
            message: 'Failed to retrieve albums.',
            error: error.message,
        });
    }
}

const removeAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findByPk(id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        await album.destroy();
        res.status(200).json({ message: 'Album deleted successfully!' });
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({
            message: 'Failed to delete album.',
            error: error.message,
        });
    }
 }

export { addAlbum, listAlbums, removeAlbum };