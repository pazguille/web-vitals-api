const express = require('express');
const webVitals = require('../api/web-vitals');
const serp = require('../api/serp');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/api/web-vitals', webVitals);
app.get('/api/serp', serp);

module.exports = app;
