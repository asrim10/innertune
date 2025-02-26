import generateToken from "../../security/jwt-util.js";
import Users from "../model/userSchema.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    // Fetch user from database by email
    const user = await Users.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Check if password matches (assuming plaintext here, ideally use bcrypt)
    if (user.password === password) {
      const token = generateToken({ user: user.toJSON() });
      return res.status(200).send({
        data: {
          access_token: token,
          role: user.role,
          userId: user.userId,
        },
        message: "Successfully logged in",
      });
    } else {
      return res.status(400).send({ message: "Invalid password" });
    }
  } catch (e) {
    console.error("Login Error:", e);
    res.status(500).json({ error: "Failed to login" });
  }
};


const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;  // Don't send the password back to the client
    res.status(200).send({ data: user, message: "Successfully fetched current user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

export { login, init };
