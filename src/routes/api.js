const express = require('express');
const router = express.Router();

// Import API route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');
const examRoutes = require('./exams');
const questionRoutes = require('./questions');

// API version and documentation
router.get('/', (req, res) => {
  res.json({
    message: 'LGS Super XXX API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      exams: '/api/exams',
      questions: '/api/questions',
    },
  });
});

// Route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/exams', examRoutes);
router.use('/questions', questionRoutes);

module.exports = router;