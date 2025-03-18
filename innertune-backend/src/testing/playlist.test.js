import { Sequelize, DataTypes } from 'sequelize';
import UsersModel from '../models/userSchema.js'; // Adjust path as needed
import PlaylistModel from '../models/playlist.js'; // Adjust path as needed

// Create a new in-memory database for testing
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Define models for testing
const Users = UsersModel.init(sequelize, DataTypes);
const Playlist = PlaylistModel.init(sequelize, DataTypes);

// Setup associations
Users.hasMany(Playlist, { foreignKey: 'user_id' });
Playlist.belongsTo(Users, { foreignKey: 'user_id' });

beforeAll(async () => {
  await sequelize.sync(); // Sync models with test DB
});

afterAll(async () => {
  await sequelize.close(); // Close connection after tests
});

describe('Playlist Model', () => {
  let user;

  beforeEach(async () => {
    // Create a test user before each test
    user = await Users.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
  });

  test('should create a playlist with valid attributes', async () => {
    const playlist = await Playlist.create({
      playlistName: 'My Playlist',
      playlistDesc: 'This is a test playlist',
      playlistImg: 'https://example.com/playlist.jpg',
      user_id: user.userId,
    });

    expect(playlist.id).toBeDefined();
    expect(playlist.playlistName).toBe('My Playlist');
    expect(playlist.playlistDesc).toBe('This is a test playlist');
    expect(playlist.playlistImg).toBe('https://example.com/playlist.jpg');
    expect(playlist.user_id).toBe(user.userId);
  });

  test('should require a playlistName', async () => {
    expect.assertions(2);
    try {
      await Playlist.create({
        playlistDesc: 'Missing name',
        playlistImg: 'https://example.com/playlist.jpg',
        user_id: user.userId,
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors.map((e) => e.path)).toContain('playlistName');
    }
  });

  test('should require a user_id (foreign key)', async () => {
    expect.assertions(2);
    try {
      await Playlist.create({
        playlistName: 'Orphan Playlist',
        playlistDesc: 'No user ID provided',
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeForeignKeyConstraintError');
      expect(error.message).toContain('FOREIGN KEY constraint failed');
    }
  });

  test('should allow nullable fields (playlistDesc, playlistImg)', async () => {
    const playlist = await Playlist.create({
      playlistName: 'Simple Playlist',
      user_id: user.userId,
    });

    expect(playlist.playlistDesc).toBeNull();
    expect(playlist.playlistImg).toBeNull();
  });
});
