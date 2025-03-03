import Playlist from './playlistSchema.js';
import Song from './songSchema.js';
import Users from './userSchema.js';

// Define relationships after models are initialized

// Many-to-Many relationship between Playlist and Song
Playlist.belongsToMany(Song, {
  through: 'PlaylistSongs',
  foreignKey: 'playlistId',
});

Song.belongsToMany(Playlist, {
  through: 'PlaylistSongs',
  foreignKey: 'songId',
});

// One-to-Many relationship between Playlist and User
Playlist.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Playlist, { foreignKey: 'user_id' });

export { Playlist, Song, Users }; // Export models for usage in other files
