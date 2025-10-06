const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Import middlewares
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// Import Swagger config
const swaggerSpec = require('./config/swagger');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Swagger documentation - only available in development mode
if (process.env.NODE_ENV === 'development') {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      docExpansion: 'none'
    }
  }));
  console.log('Swagger documentation available at /api/docs');
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;