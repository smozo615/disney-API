const express = require('express');
const { routerApi } = require('./routes');
const {
  logErrorMiddleware,
  boomErrorMiddleware,
  errorMiddleware,
  ormErrorMiddleware,
} = require('./middlewares/error.middleware');

const app = express();
const port = process.env.PORT;

// to enable json
app.use(express.json());

// Swagger - doc
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disney',
      description: 'This is REST API for disney',
      version: '1.0.0',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development Server',
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

// Router
routerApi(app);

// Errors middlewares
app.use(logErrorMiddleware);
app.use(boomErrorMiddleware);
app.use(ormErrorMiddleware);
app.use(errorMiddleware);

app.listen(port);
