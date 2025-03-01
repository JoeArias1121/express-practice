import users from "../model/users.json" assert { type: "json" };
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const usersDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

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
  const foundUser = usersDB.users.find((user) => user.username === username);
  if (!foundUser) {
    // if not found then req failed
    return res.sendStatus(401); // unauthorized
  }
  // comparing the password with the hashed password
  const match = await bcrypt.compare(password, foundUser.password);
  // if match is true then we can create jwt tokens
  if (match) {
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
    // saving the refresh token in the database inside the user object
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fs.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    // if no match then req failed
    res.sendStatus(401); // unauthorized
  }
};
