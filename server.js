require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json()); // parse JSON bodies

// connect DB
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/items', itemRoutes);

// error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
