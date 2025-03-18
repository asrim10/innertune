import Users from "../model/userSchema.js";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create new user using Sequelize (storing plaintext password)
    const newUser = await Users.create({
      username,
      email,
      password, // Store password as it is
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      process.env.secretkey, // Make sure you have a secret key set in .env
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "User created successfully",
      data: { token, userId: newUser.id, username: newUser.username },
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const body = req.body;

    const user = await Users.update(body, {
      where: { userId: userId },
    });

    if (user[0] === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to update the user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await Users.destroy({
      where: { userId: userId },
    });

    if (result === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to delete user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Using findAll to get all users
    const users = await Users.findAll();

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ data: users }); // Send users data
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch user" });
  }
};

