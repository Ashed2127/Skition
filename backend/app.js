 const express = require('express');
 const helmet = require('helmet');
 const cors = require('cors');
 const rateLimit = require('express-rate-limit');
 const authRoutes = require('./routes/authRoutes');
 const errorHandler = require('./middlewares/errorHandler'); // Now properly imported
 
 const app = express();
 
 // Security middleware
 app.use(helmet());
 app.use(cors());
 app.use(express.json());
 
 // Rate limiting
 const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 100
 });
 app.use(limiter);
 
 // Routes
 app.use('/api/auth', authRoutes);
 
 // Error handling - MUST be last middleware
 app.use(errorHandler);
 
 module.exports = app;
