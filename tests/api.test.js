const request = require('supertest');
const app = require('../src/app');

describe('API Routes', () => {
  describe('Auth Endpoints', () => {
    describe('POST /api/auth/login', () => {
      it('should validate required fields', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({})
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Validation failed');
        expect(response.body.errors).toBeInstanceOf(Array);
      });

      it('should validate email format', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'invalid-email',
            password: 'password123'
          })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.some(err => err.msg.includes('email'))).toBe(true);
      });

      it('should validate password length', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: '123'
          })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.some(err => err.msg.includes('6 karakter'))).toBe(true);
      });

      it('should return success for valid input', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'password123'
          })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.email).toBe('test@example.com');
      });
    });

    describe('POST /api/auth/register', () => {
      it('should validate all required fields', async () => {
        const response = await request(app)
          .post('/api/auth/register')
          .send({})
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.length).toBeGreaterThan(0);
      });

      it('should validate password confirmation', async () => {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'different-password'
          })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.some(err => err.msg.includes('eşleşmiyor'))).toBe(true);
      });

      it('should return success for valid registration', async () => {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123'
          })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe('Test User');
        expect(response.body.data.email).toBe('test@example.com');
      });
    });
  });

  describe('Users Endpoints', () => {
    describe('GET /api/users', () => {
      it('should return users list', async () => {
        const response = await request(app)
          .get('/api/users')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
      });
    });

    describe('GET /api/users/:id', () => {
      it('should validate MongoDB ObjectId', async () => {
        const response = await request(app)
          .get('/api/users/invalid-id')
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.some(err => err.msg.includes('ID'))).toBe(true);
      });

      it('should return user for valid ID', async () => {
        const validObjectId = '507f1f77bcf86cd799439011';
        const response = await request(app)
          .get(`/api/users/${validObjectId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(validObjectId);
      });
    });
  });

  describe('Exams Endpoints', () => {
    describe('GET /api/exams', () => {
      it('should return exams list with default pagination', async () => {
        const response = await request(app)
          .get('/api/exams')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.exams).toBeInstanceOf(Array);
        expect(response.body.data.pagination.page).toBe(1);
        expect(response.body.data.pagination.limit).toBe(10);
      });

      it('should validate subject filter', async () => {
        const response = await request(app)
          .get('/api/exams?subject=invalid-subject')
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.some(err => err.msg.includes('ders'))).toBe(true);
      });

      it('should apply valid filters', async () => {
        const response = await request(app)
          .get('/api/exams?subject=matematik&difficulty=orta&page=2&limit=5')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.filters.subject).toBe('matematik');
        expect(response.body.data.filters.difficulty).toBe('orta');
        expect(response.body.data.pagination.page).toBe(2);
        expect(response.body.data.pagination.limit).toBe(5);
      });
    });

    describe('POST /api/exams', () => {
      it('should validate required fields', async () => {
        const response = await request(app)
          .post('/api/exams')
          .send({})
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.length).toBeGreaterThan(0);
      });

      it('should create exam with valid data', async () => {
        const examData = {
          title: 'Matematik Deneme Sınavı',
          description: 'LGS matematik konularını kapsayan deneme sınavı',
          subject: 'matematik',
          difficulty: 'orta',
          duration: 90,
          questions: ['507f1f77bcf86cd799439011']
        };

        const response = await request(app)
          .post('/api/exams')
          .send(examData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe(examData.title);
      });
    });
  });

  describe('Questions Endpoints', () => {
    describe('GET /api/questions', () => {
      it('should return questions list', async () => {
        const response = await request(app)
          .get('/api/questions')
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.questions).toBeInstanceOf(Array);
      });
    });

    describe('POST /api/questions', () => {
      it('should validate question data', async () => {
        const response = await request(app)
          .post('/api/questions')
          .send({
            question: 'Kısa',
            options: ['A'],
            correctAnswer: 0,
            subject: 'matematik',
            difficulty: 'kolay',
            topic: 'Sayılar'
          })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.errors.some(err => err.msg.includes('10 karakter'))).toBe(true);
        expect(response.body.errors.some(err => err.msg.includes('2-6 arası'))).toBe(true);
      });

      it('should create question with valid data', async () => {
        const questionData = {
          question: '2 + 3 işleminin sonucu kaçtır?',
          options: ['4', '5', '6', '7'],
          correctAnswer: 1,
          subject: 'matematik',
          difficulty: 'kolay',
          topic: 'Toplama İşlemi',
          explanation: '2 + 3 = 5 olur.'
        };

        const response = await request(app)
          .post('/api/questions')
          .send(questionData)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.question).toBe(questionData.question);
      });
    });
  });
});