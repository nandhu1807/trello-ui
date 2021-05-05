const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./helpers/logger');
const NODE_ENV = process.env.NODE_ENV || 'UNKNOWN';
const PORT = process.env.PORT || 8000;
const correlator = require('express-correlation-id');
const { createProxyMiddleware } = require('http-proxy-middleware');
const appRoutes = require('./app-routes');
const app = express();

app.use(logger.winston);
app.use(logger.express);
app.use(cookieParser());
app.use(correlator());
const corrMiddleware = function(req, res, next) {
  req.headers['X-Correlation-ID'] = req.correlationId();
  next();
};

app.use(corrMiddleware);
app.use(express.static(path.join('build')));

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(bodyParser.json({ limit: '256kb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '256kb',
  }),
);

app.use(createProxyMiddleware(['/api/**'], appRoutes.trelloAPISettings));

app.listen(PORT, error => {
  if (error) {
    console.error(error);
  }
  console.info(`==> 🌎 App Listening on ${PORT} please open your browser and navigate to http://localhost:${PORT}/`);
  console.info(`==> 🌎 Running ${NODE_ENV} server`);
});
