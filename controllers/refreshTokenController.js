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
  const cookies = req.cookies
  // checking to see if the username and password are provided
  if (!cookies?.jwt) {
    // if one isn't provided then req failed
    return res.status(401)
  }
  console.log(cookies.jwt)
  const refreshToken = cookies.jwt;
  // finding user in the database
  const foundUser = usersDB.users.find((user) => user.refreshToken === refreshToken);
  if (!foundUser) {
    // if not found then req failed
    return res.sendStatus(403); // forbidden
  }
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if ( error || foundUser.username !== decoded.username ) {
        return res.sendStatus(403); // forbidden
      }
      const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );
      res.json({ accessToken });
    }
  )
  
};
