import usersDB from '../model/users.json' assert { type: "json"};
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const users = {
  users: usersDB,
  setUsers: function (data) { this.users = data }
}

export const handleNewUser = async (req, res) => { 
  const { username, password } = req.body;
  // checking to see if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // checking to see if the username already exists
  const duplicate = users.users.find(user => user.username === username)
  if (duplicate) {
    return res.status(409).json({ message: 'Username already exists' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    users.setUsers([...users.users, newUser]);
    await fs.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(users.users)
    );
    console.log(users.users)
    res.status(201).json({ message: `User ${username} created successfully` });
  } catch (error) { 
    res.status(500).json({ 'message': error.message})
  }
}