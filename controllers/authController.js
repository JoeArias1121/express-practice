import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  // checking to see if the username and password are provided
  if (!username || !password) {
    // if one isn't provided then req failed
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  // finding user in the database
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    // if not found then req failed
    console.log(`User ${username} not found`);
    return res.sendStatus(401); // unauthorized
  }
  // comparing the password with the hashed password
  const match = await bcrypt.compare(password, foundUser.password);
  // if match is true then we can create jwt tokens
  if (match) {
    // returns the values of an object as an array
    const roles = Object.values(foundUser.roles);
    // creating jwt tokens
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1D" }
    );
    try {
      // updating the user object with the refresh token
      const currentUser = await User.findOneAndUpdate({ username }, { refreshToken }).exec();
      console.log(`User ${currentUser.username} logged in`);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch(error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // if no match then req failed
    res.sendStatus(401); // unauthorized
  }
};
