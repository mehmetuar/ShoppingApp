const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Merhaba, backend çalışıyor!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("🛣️ /api/products route'u tanımlandı");
});
