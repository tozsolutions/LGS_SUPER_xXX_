# LGS Super XXX 🎓

[![CI/CD Pipeline](https://github.com/tozsolutions/LGS_SUPER_xXX_/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/tozsolutions/LGS_SUPER_xXX_/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/tozsolutions/LGS_SUPER_xXX_/branch/main/graph/badge.svg)](https://codecov.io/gh/tozsolutions/LGS_SUPER_xXX_)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

LGS (Lise Giriş Sınavı) Super XXX, Türkiye'deki lise giriş sınavına hazırlanan öğrenciler için geliştirilmiş kapsamlı bir eğitim platformudur.

## 🚀 Özellikler

### 📚 Eğitim İçerikleri
- **Matematik**: Sayılar, Cebir, Geometri, Veri İşleme
- **Türkçe**: Okuma Anlama, Yazım Kuralları, Sözcük Bilgisi
- **Fen Bilimleri**: Fizik, Kimya, Biyoloji
- **Sosyal Bilgiler**: Tarih, Coğrafya, Vatandaşlık
- **İngilizce**: Kelime Bilgisi, Dilbilgisi, Okuma Anlama

### 🎯 Ana Özellikler
- ✅ Binlerce LGS sorusu
- ✅ Gerçek sınav formatında deneme sınavları
- ✅ Detaylı performans analizi
- ✅ Kişiselleştirilmiş öğrenme planları
- ✅ İlerleme takibi ve raporlama
- ✅ Çok kullanıcılı sistem (Öğrenci, Öğretmen, Yönetici)
- ✅ Mobil uyumlu tasarım
- ✅ Gerçek zamanlı bildirimler

## 🛠️ Teknoloji Yığını

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM
- **Redis** - Önbellek ve session store
- **JWT** - Kimlik doğrulama
- **Bcrypt** - Şifre hashleme

### Frontend
- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **Font Awesome** - İkonlar
- **Vanilla JavaScript** - Client-side scripting

### DevOps & Tools
- **Docker** - Konteynerizasyon
- **GitHub Actions** - CI/CD
- **ESLint** - Kod kalitesi
- **Prettier** - Kod formatlama
- **Jest** - Test framework
- **Nginx** - Reverse proxy

## 🏗️ Kurulum

### Gereksinimler
- Node.js 18+ 
- MongoDB 6+
- Redis 7+
- Docker (opsiyonel)

### Yerel Geliştirme

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/tozsolutions/LGS_SUPER_xXX_.git
cd LGS_SUPER_xXX_
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın:**
```bash
cp .env.example .env
# .env dosyasını düzenleyin
```

4. **Veritabanını başlatın:**
```bash
# MongoDB ve Redis'i başlatın
mongod
redis-server
```

5. **Uygulamayı başlatın:**
```bash
# Geliştirme modu
npm run dev

# Üretim modu
npm start
```

### Docker ile Kurulum

```bash
# Tüm servisleri başlat
docker-compose up --build

# Sadece uygulamayı başlat
docker build -t lgs-super-xxx .
docker run -p 3000:3000 lgs-super-xxx
```

## 📁 Proje Yapısı

```
LGS_SUPER_xXX_/
├── src/
│   ├── app.js              # Ana uygulama dosyası
│   ├── config/             # Yapılandırma dosyaları
│   │   └── database.js     # Veritabanı konfigürasyonu
│   ├── controllers/        # Route controller'ları
│   ├── middleware/         # Özel middleware'ler
│   │   └── errorHandler.js # Global hata yakalayıcı
│   ├── models/             # Mongoose modelleri
│   │   ├── User.js         # Kullanıcı modeli
│   │   ├── Question.js     # Soru modeli
│   │   └── Exam.js         # Sınav modeli
│   ├── routes/             # API ve web rotaları
│   │   ├── api.js          # API rotaları
│   │   ├── web.js          # Web rotaları
│   │   ├── auth.js         # Kimlik doğrulama
│   │   ├── users.js        # Kullanıcı yönetimi
│   │   ├── exams.js        # Sınav yönetimi
│   │   └── questions.js    # Soru yönetimi
│   └── utils/              # Yardımcı fonksiyonlar
│       └── logger.js       # Loglama sistemi
├── views/                  # EJS template'leri
│   ├── layout.ejs          # Ana layout
│   └── index.ejs           # Ana sayfa
├── public/                 # Statik dosyalar
│   ├── css/                # CSS dosyaları
│   ├── js/                 # JavaScript dosyaları
│   └── images/             # Görsel dosyalar
├── tests/                  # Test dosyaları
├── docs/                   # Dokümantasyon
├── .github/workflows/      # GitHub Actions
├── Dockerfile              # Docker konfigürasyonu
├── docker-compose.yml      # Docker Compose
├── package.json            # NPM konfigürasyonu
└── README.md               # Bu dosya
```

## 🧪 Testler

```bash
# Tüm testleri çalıştır
npm test

# Testleri izleme modunda çalıştır
npm run test:watch

# Coverage raporu oluştur
npm run test:coverage
```

## 📊 API Dokümantasyonu

### Kimlik Doğrulama
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/logout` - Çıkış
- `GET /api/auth/me` - Mevcut kullanıcı bilgisi

### Kullanıcı Yönetimi
- `GET /api/users` - Tüm kullanıcılar (admin)
- `GET /api/users/:id` - Kullanıcı detayı
- `PUT /api/users/:id` - Kullanıcı güncelleme
- `DELETE /api/users/:id` - Kullanıcı silme

### Sınav Yönetimi
- `GET /api/exams` - Sınavları listele
- `POST /api/exams` - Yeni sınav oluştur
- `GET /api/exams/:id` - Sınav detayı
- `PUT /api/exams/:id` - Sınav güncelle
- `DELETE /api/exams/:id` - Sınav sil
- `POST /api/exams/:id/submit` - Sınav gönder

### Soru Yönetimi
- `GET /api/questions` - Soruları listele
- `POST /api/questions` - Yeni soru oluştur
- `GET /api/questions/:id` - Soru detayı
- `PUT /api/questions/:id` - Soru güncelle
- `DELETE /api/questions/:id` - Soru sil

## 🔧 Konfigürasyon

### Ortam Değişkenleri

| Değişken | Açıklama | Varsayılan |
|----------|----------|------------|
| `NODE_ENV` | Çalışma ortamı | `development` |
| `PORT` | Uygulama portu | `3000` |
| `MONGODB_URI` | MongoDB bağlantı string'i | `mongodb://localhost:27017/lgs_super_xxx` |
| `JWT_SECRET` | JWT gizli anahtarı | - |
| `SESSION_SECRET` | Session gizli anahtarı | - |
| `SMTP_HOST` | Email sunucu host'u | - |
| `SMTP_USER` | Email kullanıcı adı | - |
| `SMTP_PASSWORD` | Email şifresi | - |

## 🚀 Deployment

### Production Checklist

- [ ] Ortam değişkenlerini production için ayarlayın
- [ ] SSL sertifikalarını konfigüre edin
- [ ] Veritabanı backup stratejisi oluşturun
- [ ] Monitoring ve logging sistemlerini kurun
- [ ] Rate limiting ve security ayarlarını yapın
- [ ] CDN konfigürasyonu yapın
- [ ] Health check endpoint'lerini test edin

### Deployment Seçenekleri

#### Docker ile Deployment
```bash
# Production image oluştur
docker build -t lgs-super-xxx:production .

# Production ortamında çalıştır
docker run -d \
  --name lgs-super-xxx \
  -p 3000:3000 \
  --env-file .env.production \
  lgs-super-xxx:production
```

#### Manual Deployment
```bash
# Production bağımlılıklarını yükle
npm ci --only=production

# Uygulamayı başlat
NODE_ENV=production npm start
```

## 🔒 Güvenlik

- **Helmet.js** - HTTP header güvenliği
- **CORS** - Cross-origin request control
- **Rate Limiting** - API rate limiting
- **Input Validation** - Express Validator ile girdi validasyonu
- **XSS Protection** - Cross-site scripting koruması
- **SQL Injection Protection** - Mongoose ile NoSQL injection koruması
- **HTTPS Redirect** - HTTPS yönlendirmesi
- **Session Security** - Güvenli session yönetimi

## 📈 Performans

- **Compression** - Gzip sıkıştırma
- **Caching** - Redis ile önbellekleme
- **Database Indexing** - MongoDB indeksleme
- **Image Optimization** - Görsel optimizasyonu
- **Minification** - CSS/JS küçültme
- **CDN Integration** - Content Delivery Network

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Kod Standartları

- ESLint kurallarına uyun
- Prettier formatını kullanın
- Test yazın
- Commit mesajlarını anlamlı yazın
- Dokümantasyonu güncelleyin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Proje**: [LGS Super XXX](https://github.com/tozsolutions/LGS_SUPER_xXX_)
- **Geliştirici**: TozSolutions
- **Email**: info@tozsolutions.com
- **Website**: [www.tozsolutions.com](https://www.tozsolutions.com)

## 🙏 Teşekkürler

- Bootstrap ekibi
- MongoDB ekibi
- Express.js toplululuğu
- Tüm açık kaynak katkıda bulunanlar

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!