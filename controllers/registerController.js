import User from '../model/User.js';
import bcrypt from 'bcrypt';


export const handleNewUser = async (req, res) => { 
  const { username, password } = req.body;
  // checking to see if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // checking to see if the username already exists
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res.sendStatus(409).json({ message: 'Username already exists' }); // 409 Conflict
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // creating a new user object
    // creaye and store the new user
    const result = await User.create({
      username,
      "password": hashedPassword
    });

    console.log(result);
    
    res.status(201).json({ message: `User ${username} created successfully` });
  } catch (error) { 
    res.status(500).json({ 'message': error.message})
  }
}