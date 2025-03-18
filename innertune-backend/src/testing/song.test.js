import { Sequelize, DataTypes } from 'sequelize';
import SongModel from '../models/Song.js'; // Adjust the path as needed

// Create a new in-memory database for testing
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Define the Song model for testing
const Song = SongModel.init(sequelize, DataTypes);

beforeAll(async () => {
  await sequelize.sync(); // Sync model with test DB
});

afterAll(async () => {
  await sequelize.close(); // Close connection after tests
});

describe('Song Model', () => {
  test('should create a song with valid attributes', async () => {
    const song = await Song.create({
      title: 'Test Song',
      image_url: 'https://example.com/image.jpg',
      album: 'Test Album',
      duration: '3:45',
      audio_url: 'https://example.com/audio.mp3',
    });

    expect(song.id).toBeDefined(); // Ensure ID is auto-generated
    expect(song.title).toBe('Test Song');
    expect(song.image_url).toBe('https://example.com/image.jpg');
    expect(song.album).toBe('Test Album');
    expect(song.duration).toBe('3:45');
    expect(song.audio_url).toBe('https://example.com/audio.mp3');
  });

  test('should require a title and audio_url', async () => {
    expect.assertions(2);
    try {
      await Song.create({
        album: 'Test Album',
        duration: '3:30',
        image_url: 'https://example.com/image.jpg',
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors.map((e) => e.path)).toContain('title');
    }

    try {
      await Song.create({
        title: 'No Audio',
        album: 'Test Album',
        duration: '3:30',
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors.map((e) => e.path)).toContain('audio_url');
    }
  });

  test('should allow nullable fields (image_url, album, duration)', async () => {
    const song = await Song.create({
      title: 'Minimal Song',
      audio_url: 'https://example.com/audio.mp3',
    });

    expect(song.image_url).toBeNull();
    expect(song.album).toBeNull();
    expect(song.duration).toBeNull();
  });
});
