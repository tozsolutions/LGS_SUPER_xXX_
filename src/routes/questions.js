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

// GET /api/questions
router.get('/', [
  query('subject').optional().isIn(['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce']).withMessage('Geçerli bir ders seçiniz'),
  query('difficulty').optional().isIn(['kolay', 'orta', 'zor']).withMessage('Geçerli bir zorluk seviyesi seçiniz'),
  query('topic').optional().trim().isLength({ min: 1 }).withMessage('Konu boş olamaz'),
  query('page').optional().isInt({ min: 1 }).withMessage('Sayfa numarası 1 veya daha büyük olmalıdır'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit 1-50 arasında olmalıdır'),
], validateRequest, (req, res) => {
  // TODO: Implement get all questions with filtering
  res.json({
    success: true,
    message: 'Get all questions endpoint - TODO: Implement question listing',
    data: {
      questions: [],
      pagination: {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        total: 0,
      },
      filters: {
        subject: req.query.subject,
        difficulty: req.query.difficulty,
        topic: req.query.topic,
      },
    },
  });
});

// GET /api/questions/:id
router.get('/:id', [
  param('id').isMongoId().withMessage('Geçerli bir soru ID\'si giriniz'),
], validateRequest, (req, res) => {
  // TODO: Implement get question by ID
  res.json({
    success: true,
    message: 'Get question by ID endpoint - TODO: Implement question retrieval',
    data: { id: req.params.id },
  });
});

// POST /api/questions
router.post('/', [
  body('question').trim().isLength({ min: 10 }).withMessage('Soru metni en az 10 karakter olmalıdır'),
  body('options').isArray({ min: 2, max: 6 }).withMessage('2-6 arası seçenek olmalıdır'),
  body('correctAnswer').isInt({ min: 0, max: 5 }).withMessage('Doğru cevap 0-5 arasında bir indeks olmalıdır'),
  body('subject').isIn(['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce']).withMessage('Geçerli bir ders seçiniz'),
  body('difficulty').isIn(['kolay', 'orta', 'zor']).withMessage('Geçerli bir zorluk seviyesi seçiniz'),
  body('topic').trim().isLength({ min: 1 }).withMessage('Konu boş olamaz'),
  body('explanation').optional().trim().isLength({ max: 1000 }).withMessage('Açıklama en fazla 1000 karakter olabilir'),
], validateRequest, (req, res) => {
  // TODO: Implement create question
  res.json({
    success: true,
    message: 'Create question endpoint - TODO: Implement question creation',
    data: req.body,
  });
});

// PUT /api/questions/:id
router.put('/:id', [
  param('id').isMongoId().withMessage('Geçerli bir soru ID\'si giriniz'),
  body('question').optional().trim().isLength({ min: 10 }).withMessage('Soru metni en az 10 karakter olmalıdır'),
  body('options').optional().isArray({ min: 2, max: 6 }).withMessage('2-6 arası seçenek olmalıdır'),
  body('correctAnswer').optional().isInt({ min: 0, max: 5 }).withMessage('Doğru cevap 0-5 arasında bir indeks olmalıdır'),
  body('subject').optional().isIn(['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce']).withMessage('Geçerli bir ders seçiniz'),
  body('difficulty').optional().isIn(['kolay', 'orta', 'zor']).withMessage('Geçerli bir zorluk seviyesi seçiniz'),
  body('topic').optional().trim().isLength({ min: 1 }).withMessage('Konu boş olamaz'),
  body('explanation').optional().trim().isLength({ max: 1000 }).withMessage('Açıklama en fazla 1000 karakter olabilir'),
], validateRequest, (req, res) => {
  // TODO: Implement update question
  res.json({
    success: true,
    message: 'Update question endpoint - TODO: Implement question update',
    data: { id: req.params.id, updates: req.body },
  });
});

// DELETE /api/questions/:id
router.delete('/:id', [
  param('id').isMongoId().withMessage('Geçerli bir soru ID\'si giriniz'),
], validateRequest, (req, res) => {
  // TODO: Implement delete question
  res.json({
    success: true,
    message: 'Delete question endpoint - TODO: Implement question deletion',
    data: { id: req.params.id },
  });
});

// GET /api/questions/random
router.get('/random', [
  query('subject').optional().isIn(['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce']).withMessage('Geçerli bir ders seçiniz'),
  query('difficulty').optional().isIn(['kolay', 'orta', 'zor']).withMessage('Geçerli bir zorluk seviyesi seçiniz'),
  query('count').optional().isInt({ min: 1, max: 20 }).withMessage('Soru sayısı 1-20 arasında olmalıdır'),
], validateRequest, (req, res) => {
  // TODO: Implement get random questions
  res.json({
    success: true,
    message: 'Get random questions endpoint - TODO: Implement random question selection',
    data: {
      questions: [],
      count: parseInt(req.query.count) || 5,
      filters: {
        subject: req.query.subject,
        difficulty: req.query.difficulty,
      },
    },
  });
});

module.exports = router;