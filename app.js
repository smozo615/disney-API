const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Store',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      },
    ],
  },
  apis: ['./routes/*.js'],
};

// Home
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Disney API</h1>');
});

// Documentation
app.use(
  '/api-doc',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerConfig))
);

app.listen(port);
