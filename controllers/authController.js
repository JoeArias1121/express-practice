import users from '../model/users.json' assert { type: "json"};
import bcrypt from 'bcrypt';

const usersDB = {
  users: users,
  setUsers: function (data) { this.users = data }
}

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  // checking to see if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const foundUser = usersDB.users.find(user => user.username === username);
  if (!foundUser) {
    return res.sendStatus(401); // unauthorized
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    res.json({ 'success': `User ${username} logged in successfully!` });
  } else {
    res.sendStatus(401); // unauthorized
  }
}