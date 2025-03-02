import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.userId, username: user.username }, // payload data
    process.env.secretkey, // secret key from .env
    { expiresIn: process.env.expiresIn } // Optional: Expiry time for token
  );
};

export default generateToken;


