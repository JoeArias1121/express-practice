import users from "../model/users.json" assert { type: "json" };
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

export const handleLogout = async (req, res) => {
  // on client, also delete the accessToken
  const cookies = req.cookies;
  // checking to see if the username and password are provided
  if (!cookies?.jwt) {
    return res.sendStatus(204); // no content
  }
  const refreshToken = cookies.jwt;

  // is refreshToken in the database
  const foundUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // no content
  }

  // Did find refreshToken in the database need to delete it

  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fs.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only works with https (in production)
  res.sendStatus(204); // no content
};
