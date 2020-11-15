const Joi = require('joi');
const domains = require('../utils/domains.json');
const fetchSerpResults = require('../utils/fetch-serp-results');
const fetchPerfMetrics = require('../utils/fetch-perf-metrics');

const schema = Joi.object({
  q: Joi.string().required(),
  country: Joi.string().required().default('br'),
  results: Joi.number().min(1).default(10),
});

const googleQueryparams = {
  filter : 0,
  pws : 0,
  gws_rd: 'cr',
};

module.exports = async (req, res) => {
  const { value: query, error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json(error.details.map(err => ({
      param: err.path,
      type: err.type,
      message: err.message,
    })));
  }

  const options = {
    host: domains[query.country].google_domain,
    qs: {
      q: query.q.replace(/\s/g, '+'),
      gl: query.country,
      num: query.results + 1,
      ...googleQueryparams,
    },
  };

  const seoResults = await fetchSerpResults(options);

  const urls = seoResults.map(result => result.link);
  const cruxResults = await fetchPerfMetrics('url', urls, {
    formFactor: 'PHONE',
    effectiveConnectionType: '4G',
  });

  seoResults.forEach(result => {
    const crux = cruxResults.find(metrics => metrics.url === result.link);
    result.metrics = crux && crux.metrics;
  });

  res.status(200).json(seoResults);
}
