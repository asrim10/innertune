import request from 'supertest';
import express from 'express';
import { addSong, listSong, deleteSong, getAllSongs } from '../controllers/songController.js';
import Song from '../model/songSchema.js';

// Create a mock Express app
const app = express();
app.use(express.json()); // Middleware for parsing JSON requests

// Mock routes for testing
app.post('/song/add', addSong);
app.get('/song/list', listSong);
app.delete('/song/delete', deleteSong);
app.get('/song/all', getAllSongs);

// Mock the Song model
jest.mock('../model/songSchema.js');

describe('Song Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('should add a new song successfully', async () => {
    Song.create.mockResolvedValue({
      id: 1,
      title: 'Test Song',
      description: 'Test description',
      album: 'Test Album',
      image_url: 'uploads/image.jpg',
      audio_url: 'uploads/audio.mp3',
    });

    const response = await request(app)
      .post('/song/add')
      .send({
        title: 'Test Song',
        description: 'Test description',
        album: 'Test Album',
        files: {
          image: [{ path: 'uploads/image.jpg' }],
          audio: [{ path: 'uploads/audio.mp3' }],
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.song.title).toBe('Test Song');
  });

  test('should return an error if image or audio is missing', async () => {
    const response = await request(app).post('/song/add').send({
      title: 'Test Song',
      description: 'Test description',
      album: 'Test Album',
      files: {}, // No image or audio
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Image and audio are required');
  });

  test('should list all songs', async () => {
    Song.findAll.mockResolvedValue([
      {
        id: 1,
        title: 'Song 1',
        image_url: 'uploads/image1.jpg',
        audio_url: 'uploads/audio1.mp3',
      },
      {
        id: 2,
        title: 'Song 2',
        image_url: 'uploads/image2.jpg',
        audio_url: 'uploads/audio2.mp3',
      },
    ]);

    const response = await request(app).get('/song/list');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe('Song 1');
    expect(response.body[1].title).toBe('Song 2');
  });

  test('should delete a song successfully', async () => {
    Song.findByPk.mockResolvedValue({
      id: 1,
      destroy: jest.fn().mockResolvedValue(true), // Mock destroy function
    });

    const response = await request(app).delete('/song/delete').send({ id: 1 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Song removed successfully');
  });

  test('should return error if song not found', async () => {
    Song.findByPk.mockResolvedValue(null); // No song found

    const response = await request(app).delete('/song/delete').send({ id: 99 });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Song not found');
  });

  test('should return all songs with updated URLs', async () => {
    Song.findAll.mockResolvedValue([
      {
        id: 1,
        title: 'Song 1',
        image_url: 'image1.jpg',
        audio_url: 'audio1.mp3',
      },
    ]);

    const response = await request(app).get('/song/all');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.songs[0].image_url).toBe('http://localhost:4000/uploads/image1.jpg');
    expect(response.body.songs[0].audio_url).toBe('http://localhost:4000/uploads/audio1.mp3');
  });
});
