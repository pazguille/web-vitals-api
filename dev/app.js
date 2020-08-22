const express = require('express');
const webVitals = require('../api/web-vitals');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/api/web-vitals', webVitals);

module.exports = app;
