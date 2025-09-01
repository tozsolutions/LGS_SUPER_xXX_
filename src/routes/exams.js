const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// GET /api/exams
router.get('/', [
  query('subject').optional().isIn(['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce']).withMessage('Geçerli bir ders seçiniz'),
  query('difficulty').optional().isIn(['kolay', 'orta', 'zor']).withMessage('Geçerli bir zorluk seviyesi seçiniz'),
  query('page').optional().isInt({ min: 1 }).withMessage('Sayfa numarası 1 veya daha büyük olmalıdır'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit 1-50 arasında olmalıdır'),
], validateRequest, (req, res) => {
  // TODO: Implement get all exams with filtering
  res.json({
    success: true,
    message: 'Get all exams endpoint - TODO: Implement exam listing',
    data: {
      exams: [],
      pagination: {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        total: 0,
      },
      filters: {
        subject: req.query.subject,
        difficulty: req.query.difficulty,
      },
    },
  });
});

// GET /api/exams/:id
router.get('/:id', [
  param('id').isMongoId().withMessage('Geçerli bir sınav ID\'si giriniz'),
], validateRequest, (req, res) => {
  // TODO: Implement get exam by ID
  res.json({
    success: true,
    message: 'Get exam by ID endpoint - TODO: Implement exam retrieval',
    data: { id: req.params.id },
  });
});

// POST /api/exams
router.post('/', [
  body('title').trim().isLength({ min: 3 }).withMessage('Sınav başlığı en az 3 karakter olmalıdır'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Açıklama en fazla 500 karakter olabilir'),
  body('subject').isIn(['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce']).withMessage('Geçerli bir ders seçiniz'),
  body('difficulty').isIn(['kolay', 'orta', 'zor']).withMessage('Geçerli bir zorluk seviyesi seçiniz'),
  body('duration').isInt({ min: 1, max: 300 }).withMessage('Sınav süresi 1-300 dakika arasında olmalıdır'),
  body('questions').isArray({ min: 1 }).withMessage('En az 1 soru olmalıdır'),
], validateRequest, (req, res) => {
  // TODO: Implement create exam
  res.json({
    success: true,
    message: 'Create exam endpoint - TODO: Implement exam creation',
    data: req.body,
  });
});

// PUT /api/exams/:id
router.put('/:id', [
  param('id').isMongoId().withMessage('Geçerli bir sınav ID\'si giriniz'),
  body('title').optional().trim().isLength({ min: 3 }).withMessage('Sınav başlığı en az 3 karakter olmalıdır'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Açıklama en fazla 500 karakter olabilir'),
  body('subject').optional().isIn(['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce']).withMessage('Geçerli bir ders seçiniz'),
  body('difficulty').optional().isIn(['kolay', 'orta', 'zor']).withMessage('Geçerli bir zorluk seviyesi seçiniz'),
  body('duration').optional().isInt({ min: 1, max: 300 }).withMessage('Sınav süresi 1-300 dakika arasında olmalıdır'),
], validateRequest, (req, res) => {
  // TODO: Implement update exam
  res.json({
    success: true,
    message: 'Update exam endpoint - TODO: Implement exam update',
    data: { id: req.params.id, updates: req.body },
  });
});

// DELETE /api/exams/:id
router.delete('/:id', [
  param('id').isMongoId().withMessage('Geçerli bir sınav ID\'si giriniz'),
], validateRequest, (req, res) => {
  // TODO: Implement delete exam
  res.json({
    success: true,
    message: 'Delete exam endpoint - TODO: Implement exam deletion',
    data: { id: req.params.id },
  });
});

// POST /api/exams/:id/submit
router.post('/:id/submit', [
  param('id').isMongoId().withMessage('Geçerli bir sınav ID\'si giriniz'),
  body('answers').isArray().withMessage('Cevaplar array formatında olmalıdır'),
], validateRequest, (req, res) => {
  // TODO: Implement submit exam answers
  res.json({
    success: true,
    message: 'Submit exam endpoint - TODO: Implement exam submission and scoring',
    data: {
      examId: req.params.id,
      answers: req.body.answers,
      score: null, // TODO: Calculate score
      results: null, // TODO: Provide detailed results
    },
  });
});

module.exports = router;