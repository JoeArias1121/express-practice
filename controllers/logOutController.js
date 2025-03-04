import User from "../model/User.js";

export const handleLogout = async (req, res) => {
  // on client, also delete the accessToken
  const cookies = req.cookies;
  // checking to see if the username and password are provided
  if (!cookies?.jwt) {
    return res.sendStatus(204); // no content
  }
  const refreshToken = cookies.jwt;

  // is refreshToken in the database
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // no content
  }

  // Did find refreshToken in the database need to delete it
  foundUser.refreshToken = "";
  try {
    await foundUser.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only works with https (in production)
  res.sendStatus(204); // no content
};
