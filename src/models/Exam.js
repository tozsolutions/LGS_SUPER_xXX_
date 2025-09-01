const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Sınav başlığı gereklidir'],
    trim: true,
    minlength: [3, 'Sınav başlığı en az 3 karakter olmalıdır'],
    maxlength: [200, 'Sınav başlığı en fazla 200 karakter olabilir'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Açıklama en fazla 500 karakter olabilir'],
  },
  subject: {
    type: String,
    required: [true, 'Ders seçimi gereklidir'],
    enum: {
      values: ['matematik', 'turkce', 'fen', 'sosyal', 'ingilizce', 'genel'],
      message: 'Geçerli bir ders seçiniz',
    },
  },
  difficulty: {
    type: String,
    required: [true, 'Zorluk seviyesi gereklidir'],
    enum: {
      values: ['kolay', 'orta', 'zor'],
      message: 'Geçerli bir zorluk seviyesi seçiniz',
    },
  },
  duration: {
    type: Number,
    required: [true, 'Sınav süresi gereklidir'],
    min: [1, 'Sınav süresi en az 1 dakika olmalıdır'],
    max: [300, 'Sınav süresi en fazla 300 dakika olabilir'],
  },
  questions: [{
    questionId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
      required: true,
    },
    points: {
      type: Number,
      default: 1,
      min: [0.5, 'Puan en az 0.5 olmalıdır'],
      max: [10, 'Puan en fazla 10 olabilir'],
    },
    order: {
      type: Number,
      required: true,
    },
  }],
  totalPoints: {
    type: Number,
    default: 0,
  },
  passingScore: {
    type: Number,
    default: 60, // percentage
    min: [0, 'Geçme puanı 0\'dan küçük olamaz'],
    max: [100, 'Geçme puanı 100\'den büyük olamaz'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  publishDate: {
    type: Date,
    default: null,
  },
  expiryDate: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Sınavı oluşturan kullanıcı gereklidir'],
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Etiket en fazla 50 karakter olabilir'],
  }],
  settings: {
    showResults: {
      type: Boolean,
      default: true,
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true,
    },
    allowReview: {
      type: Boolean,
      default: true,
    },
    shuffleQuestions: {
      type: Boolean,
      default: false,
    },
    shuffleOptions: {
      type: Boolean,
      default: false,
    },
    maxAttempts: {
      type: Number,
      default: 1,
      min: [1, 'En az 1 deneme hakkı olmalıdır'],
      max: [10, 'En fazla 10 deneme hakkı olabilir'],
    },
  },
  stats: {
    totalAttempts: {
      type: Number,
      default: 0,
    },
    completedAttempts: {
      type: Number,
      default: 0,
    },
    averageScore: {
      type: Number,
      default: 0,
    },
    averageTime: {
      type: Number,
      default: 0, // in minutes
    },
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
examSchema.index({ subject: 1, difficulty: 1 });
examSchema.index({ createdBy: 1 });
examSchema.index({ isPublished: 1, isActive: 1 });
examSchema.index({ publishDate: 1 });
examSchema.index({ expiryDate: 1 });
examSchema.index({ tags: 1 });

// Virtual for completion rate
examSchema.virtual('completionRate').get(function() {
  if (this.stats.totalAttempts === 0) return 0;
  return Math.round((this.stats.completedAttempts / this.stats.totalAttempts) * 100);
});

// Virtual for question count
examSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

// Virtual for availability status
examSchema.virtual('isAvailable').get(function() {
  const now = new Date();
  return this.isPublished && 
         this.isActive && 
         (!this.publishDate || this.publishDate <= now) &&
         (!this.expiryDate || this.expiryDate > now);
});

// Pre-save middleware to calculate total points
examSchema.pre('save', function(next) {
  if (this.isModified('questions')) {
    this.totalPoints = this.questions.reduce((total, q) => total + q.points, 0);
  }
  next();
});

// Pre-save middleware to validate questions order
examSchema.pre('save', function(next) {
  if (this.isModified('questions')) {
    // Ensure unique order numbers
    const orders = this.questions.map(q => q.order);
    const uniqueOrders = [...new Set(orders)];
    if (orders.length !== uniqueOrders.length) {
      return next(new Error('Soru sıralamaları benzersiz olmalıdır'));
    }
  }
  next();
});

// Instance method to publish exam
examSchema.methods.publish = function() {
  if (this.questions.length === 0) {
    throw new Error('Sınavda en az 1 soru olmalıdır');
  }
  this.isPublished = true;
  this.publishDate = new Date();
  return this.save();
};

// Instance method to update stats
examSchema.methods.updateStats = function(score, timeSpent, isCompleted = true) {
  this.stats.totalAttempts += 1;
  
  if (isCompleted) {
    this.stats.completedAttempts += 1;
    
    // Update average score (weighted average)
    const totalScore = this.stats.averageScore * (this.stats.completedAttempts - 1) + score;
    this.stats.averageScore = Math.round(totalScore / this.stats.completedAttempts * 100) / 100;
    
    // Update average time (weighted average)
    const totalTime = this.stats.averageTime * (this.stats.completedAttempts - 1) + timeSpent;
    this.stats.averageTime = Math.round(totalTime / this.stats.completedAttempts * 100) / 100;
  }
  
  return this.save({ validateBeforeSave: false });
};

// Static method to find available exams
examSchema.statics.findAvailable = function(filters = {}) {
  const now = new Date();
  const query = {
    isPublished: true,
    isActive: true,
    $or: [
      { publishDate: { $exists: false } },
      { publishDate: null },
      { publishDate: { $lte: now } }
    ],
    $or: [
      { expiryDate: { $exists: false } },
      { expiryDate: null },
      { expiryDate: { $gt: now } }
    ],
  };
  
  if (filters.subject) query.subject = filters.subject;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  
  return this.find(query).populate('questions.questionId').populate('createdBy', 'name');
};

module.exports = mongoose.model('Exam', examSchema);