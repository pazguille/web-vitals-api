
const isValidUrl = require('../utils/is-valid-url');
const fetchPerfMetrics = require('../utils/fetch-perf-metrics');

module.exports = async (req, res) => {
  const urls = [];

  if (!(req.query.origins || req.query.urls)) {
    return res.status(400).json({
      error: 'Missing parameters: origins or urls must be defined.',
    });
  }

  if (req.query.origins) {
    from = 'origin';
    urls.push(...req.query.origins.split(','))
  } else if (req.query.urls) {
    from = 'url';
    urls.push(...req.query.urls.split(','))
  }

  if (!urls.every(isValidUrl)) {
    return res.status(400).json({
      error: 'Invalid origins or urls.',
    });
  }

  const results = await fetchPerfMetrics(from, urls);

  res.status(200).json(results || {});
}
