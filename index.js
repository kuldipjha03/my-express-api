const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Use Routes
app.use('/api', productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
