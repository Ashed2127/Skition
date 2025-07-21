 const User = require('../models/User');
 const { generateToken } = require('../utils/jwt');
 
 class AuthController {
   async register(req, res, next) {
     try {
       const { username, password } = req.body;
       
       // Check if user exists
       const existingUser = await User.findByUsername(username);
       if (existingUser) {
         return res.status(409).json({ error: 'Username already exists' });
       }
 
       // Create new user
       const user = await User.create(username, password);
       
       // Generate JWT token
       const token = generateToken(user.id);
       
       res.status(201).json({ token });
     } catch (error) {
       next(error);
     }
   }
 
   async login(req, res, next) {
     try {
       const { username, password } = req.body;
       const user = await User.findByUsername(username);
       
       if (!user) {
         return res.status(401).json({ error: 'Invalid credentials' });
       }
 
       const isValid = await user.comparePassword(password);
       if (!isValid) {
         return res.status(401).json({ error: 'Invalid credentials' });
       }
 
       const token = generateToken(user.id);
       res.json({ token });
     } catch (error) {
       next(error);
     }
   }
 }
 
 module.exports = new AuthController();
