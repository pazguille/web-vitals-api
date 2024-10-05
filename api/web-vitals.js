const Joi = require('joi');
const fetchPerfMetrics = require('../utils/fetch-perf-metrics');

const customJoi = Joi.extend((joi) => ({
  type: 'string2Array',
  base: joi.array(),
  coerce: (value) => (value.split ? { value: value.split(',') } : { value })
}));

const schema = Joi.object({
  urls: customJoi.string2Array().items(Joi.string().uri()),
  origins: customJoi.string2Array().items(Joi.string().uri()),
  device: Joi.string().valid('PHONE', 'DESKTOP', 'TABLET', 'ALL_FORM_FACTORS').default('PHONE'),
  connection: Joi.string().valid('offline', 'slow-2G', '2G', '3G', '4G').default('4G'),
}).or('urls', 'origins');

module.exports = async (req, res) => {
  let from;
  let sites;

  const { value: query, error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json(error.details.map(err => ({
      param: err.path,
      type: err.type,
      message: err.message,
    })));
  }

  if (query.origins) {
    from = 'origin';
    sites = query.origins;
  } else if (query.urls) {
    from = 'url';
    sites = query.urls;
  }

  const body = {
    formFactor: query.device,
    // effectiveConnectionType: query.connection,
  };

  const results = await fetchPerfMetrics(from, sites, body);
  res.status(results.code || 200).json(results);
}
