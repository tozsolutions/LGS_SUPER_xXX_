const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Soru metni gereklidir'],
    trim: true,
    minlength: [10, 'Soru metni en az 10 karakter olmalıdır'],
    maxlength: [2000, 'Soru metni en fazla 2000 karakter olabilir'],
  },
  options: [{
    type: String,
    required: [true, 'Seçenek metni gereklidir'],
    trim: true,
    maxlength: [500, 'Seçenek metni en fazla 500 karakter olabilir'],
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Doğru cevap indeksi gereklidir'],
    min: [0, 'Doğru cevap indeksi 0 veya daha büyük olmalıdır'],
    validate: {
      validator: function(value) {
        return value < this.options.length;
      },
      message: 'Doğru cevap indeksi seçenek sayısından küçük olmalıdır',
    },
  },
  subject: {
    type: String,
    required: [true, 'Ders seçimi gereklidir'],
    enum: {
      values: ['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce'],
      message: 'Geçerli bir ders seçiniz',
    },
  },
  topic: {
    type: String,
    required: [true, 'Konu gereklidir'],
    trim: true,
    maxlength: [100, 'Konu en fazla 100 karakter olabilir'],
  },
  difficulty: {
    type: String,
    required: [true, 'Zorluk seviyesi gereklidir'],
    enum: {
      values: ['kolay', 'orta', 'zor'],
      message: 'Geçerli bir zorluk seviyesi seçiniz',
    },
  },
  explanation: {
    type: String,
    trim: true,
    maxlength: [1000, 'Açıklama en fazla 1000 karakter olabilir'],
  },
  image: {
    type: String, // URL to question image if any
    default: null,
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Etiket en fazla 50 karakter olabilir'],
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Soru oluşturan kullanıcı gereklidir'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  stats: {
    totalAttempts: {
      type: Number,
      default: 0,
    },
    correctAttempts: {
      type: Number,
      default: 0,
    },
    averageTime: {
      type: Number,
      default: 0, // in seconds
    },
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
questionSchema.index({ subject: 1, difficulty: 1 });
questionSchema.index({ topic: 1 });
questionSchema.index({ createdBy: 1 });
questionSchema.index({ isActive: 1 });
questionSchema.index({ tags: 1 });

// Virtual for success rate
questionSchema.virtual('successRate').get(function() {
  if (this.stats.totalAttempts === 0) return 0;
  return Math.round((this.stats.correctAttempts / this.stats.totalAttempts) * 100);
});

// Pre-save middleware to validate options array
questionSchema.pre('save', function(next) {
  if (this.options.length < 2) {
    return next(new Error('En az 2 seçenek olmalıdır'));
  }
  if (this.options.length > 6) {
    return next(new Error('En fazla 6 seçenek olabilir'));
  }
  if (this.correctAnswer >= this.options.length) {
    return next(new Error('Doğru cevap indeksi seçenek sayısından küçük olmalıdır'));
  }
  next();
});

// Instance method to update stats
questionSchema.methods.updateStats = function(isCorrect, timeSpent) {
  this.stats.totalAttempts += 1;
  if (isCorrect) {
    this.stats.correctAttempts += 1;
  }
  
  // Update average time (weighted average)
  const totalTime = this.stats.averageTime * (this.stats.totalAttempts - 1) + timeSpent;
  this.stats.averageTime = Math.round(totalTime / this.stats.totalAttempts);
  
  return this.save({ validateBeforeSave: false });
};

// Static method to find questions by filters
questionSchema.statics.findByFilters = function(filters) {
  const query = { isActive: true };
  
  if (filters.subject) query.subject = filters.subject;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.topic) query.topic = new RegExp(filters.topic, 'i');
  if (filters.tags && filters.tags.length > 0) query.tags = { $in: filters.tags };
  
  return this.find(query);
};

// Static method to get random questions
questionSchema.statics.getRandomQuestions = function(filters, count = 5) {
  const query = { isActive: true };
  
  if (filters.subject) query.subject = filters.subject;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.topic) query.topic = new RegExp(filters.topic, 'i');
  
  return this.aggregate([
    { $match: query },
    { $sample: { size: count } },
  ]);
};

module.exports = mongoose.model('Question', questionSchema);