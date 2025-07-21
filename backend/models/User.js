 const db = require('../config/database');
 const bcrypt = require('bcryptjs');
 
 class User {
   constructor({ id, username, password_hash, created_at }) {
     this.id = id;
     this.username = username;
     this.password_hash = password_hash;
     this.created_at = created_at;
   }
 
   static async create(username, password) {
     const hashedPassword = await bcrypt.hash(password, 12);
     const [result] = await db.query(
       'INSERT INTO users (username, password_hash) VALUES (?, ?)',
       [username, hashedPassword]
     );
     return new User({ id: result.insertId, username, password_hash: hashedPassword });
   }
 
   static async findByUsername(username) {
     const [rows] = await db.query(
       'SELECT * FROM users WHERE username = ? LIMIT 1',
       [username]
     );
     return rows.length ? new User(rows[0]) : null;
   }
 
   async comparePassword(password) {
     return bcrypt.compare(password, this.password_hash);
   }
 }
 
 module.exports = User;
