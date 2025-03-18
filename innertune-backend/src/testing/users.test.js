import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import UsersModel from '../models/Users.js'; // Adjust path as needed

// Create a new in-memory database for testing
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Define the Users model for testing
const Users = UsersModel.init(sequelize, DataTypes);

beforeAll(async () => {
  await sequelize.sync(); // Sync model with test DB
});

afterAll(async () => {
  await sequelize.close(); // Close connection after tests
});

describe('Users Model', () => {
  test('should hash password before saving user', async () => {
    const user = await Users.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
    });

    expect(user.password).not.toBe('password123'); // Ensure password is hashed
    const isMatch = await bcrypt.compare('password123', user.password);
    expect(isMatch).toBe(true); // Check if the hash matches
  });

  test('should not allow duplicate emails', async () => {
    expect.assertions(1);
    try {
      await Users.create({
        username: 'anotheruser',
        email: 'test@example.com', // Same email as previous test
        password: 'password123',
        role: 'user',
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeUniqueConstraintError'); // Ensure unique constraint is enforced
    }
  });

  test('should hash password before update', async () => {
    const user = await Users.create({
      username: 'updateuser',
      email: 'update@example.com',
      password: 'oldpassword',
      role: 'user',
    });

    await user.update({ password: 'newpassword' });

    expect(user.password).not.toBe('newpassword'); // Ensure new password is hashed
    const isMatch = await bcrypt.compare('newpassword', user.password);
    expect(isMatch).toBe(true);
  });
});
