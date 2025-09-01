const express = require('express');
const router = express.Router();
const path = require('path');

// Home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'LGS Super XXX - Ana Sayfa',
    description: 'LGS (Lise Giriş Sınavı) hazırlık platformu',
  });
});

// About page
router.get('/hakkimizda', (req, res) => {
  res.render('about', {
    title: 'Hakkımızda - LGS Super XXX',
    description: 'LGS Super XXX platformu hakkında bilgiler',
  });
});

// Exams page
router.get('/sinavlar', (req, res) => {
  res.render('exams', {
    title: 'Sınavlar - LGS Super XXX',
    description: 'LGS deneme sınavları ve sorular',
  });
});

// Study materials page
router.get('/ders-materyalleri', (req, res) => {
  res.render('materials', {
    title: 'Ders Materyalleri - LGS Super XXX',
    description: 'LGS ders materyalleri ve kaynaklar',
  });
});

// Contact page
router.get('/iletisim', (req, res) => {
  res.render('contact', {
    title: 'İletişim - LGS Super XXX',
    description: 'Bizimle iletişime geçin',
  });
});

// Privacy policy
router.get('/gizlilik-politikasi', (req, res) => {
  res.render('privacy', {
    title: 'Gizlilik Politikası - LGS Super XXX',
    description: 'Gizlilik politikamız ve kişisel veri korunması',
  });
});

// Terms of service
router.get('/kullanim-kosullari', (req, res) => {
  res.render('terms', {
    title: 'Kullanım Koşulları - LGS Super XXX',
    description: 'Platform kullanım koşulları',
  });
});

module.exports = router;