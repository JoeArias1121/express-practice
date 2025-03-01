import users from "../model/users.json" assert { type: "json" };
import jwt from "jsonwebtoken";
import "dotenv/config";

const usersDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  // checking to see if the jwt is provided in cookie
  if (!cookies?.jwt) {
    // if one isn't provided then req failed
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  // finding user in the database
  const foundUser = usersDB.users.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    // if not found then req failed
    return res.sendStatus(403); // forbidden
  }
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || foundUser.username !== decoded.username) {
        return res.sendStatus(403); // forbidden
      }
      const roles = Object.values(foundUser.roles);
      // creating jwt access token
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      res.json({ accessToken });
    }
  );
};
