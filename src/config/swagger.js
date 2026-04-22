import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TukTuk Tracking API',
      version: '1.0.0',
      description: 'Real-Time Three-Wheeler Tracking & Movement Logging System for Sri Lanka Police'
    },
    servers: [
  {
    url: 'https://tuktuk-tracking-api.up.railway.app',
    description: 'Production Server'
  },
  {
    url: 'http://localhost:5000',
    description: 'Development Server'
  }
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };