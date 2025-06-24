const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  console.log("📦 /api/products route'una istek geldi");
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Dosya okunamadı:', err);
      return res.status(500).json({ error: 'Dosya okunamadı' });
    }

    try {
      const parsed = JSON.parse(data);
      const products = parsed.products;
      console.log("✅ JSON başarıyla çözümlendi");
      res.json(products);
    } catch (error) {
      console.error('❌ JSON parse hatası:', error);
      res.status(500).json({ error: 'JSON hatası' });
    }
  });
});

module.exports = router;

