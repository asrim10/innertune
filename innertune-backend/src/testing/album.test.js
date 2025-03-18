import { Sequelize, DataTypes } from 'sequelize';
import AlbumModel from '../models/Album.js'; // Adjust the path if needed

// Create a new in-memory database for testing
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Define the Album model for testing
const Album = AlbumModel.init(sequelize, DataTypes);

beforeAll(async () => {
  await sequelize.sync(); // Sync model with test DB
});

afterAll(async () => {
  await sequelize.close(); // Close connection after tests
});

describe('Album Model', () => {
  test('should create an album with valid attributes', async () => {
    const album = await Album.create({
      name: 'Test Album',
      bgColor: '#ff5733',
      description: 'This is a test album.',
      image: 'https://example.com/image.jpg',
    });

    expect(album.id).toBeDefined(); // Ensure ID is auto-generated
    expect(album.name).toBe('Test Album');
    expect(album.bgColor).toBe('#ff5733');
    expect(album.description).toBe('This is a test album.');
    expect(album.image).toBe('https://example.com/image.jpg');
  });

  test('should require a name', async () => {
    expect.assertions(2);
    try {
      await Album.create({
        bgColor: '#ff5733',
        description: 'No name album',
        image: 'https://example.com/image.jpg',
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors.map((e) => e.path)).toContain('name');
    }
  });

  test('should allow nullable fields (bgColor, description, image)', async () => {
    const album = await Album.create({
      name: 'Minimal Album',
    });

    expect(album.bgColor).toBeNull();
    expect(album.description).toBeNull();
    expect(album.image).toBeNull();
  });
});
