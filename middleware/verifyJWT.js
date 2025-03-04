import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.log("No token provided");
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        console.log("error verifying token");
        return res.sendStatus(403); //invalid token
      }
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles
      next();
    }
  )
}

export default verifyJWT;