const axios = require('axios');

const API_URL = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';
const query = { key: process.env.CRUX_TOKEN };
const metrics = {
  first_contentful_paint: 'FCP',
  largest_contentful_paint: 'LCP',
  first_input_delay: 'FID',
  cumulative_layout_shift: 'CLS',
};

async  function fetchVitalsFromCrux(from, site, body) {
  return axios.post(API_URL, { ...body, [from]: site }, { params: query })
    .catch(err => console.log('ERROR!', err.response && err.response.data));
}

async function fetchPerformanceMetrics(from, sites, body) {
  const promises = sites.map(site => fetchVitalsFromCrux(from, site, body));
  return Promise.all(promises)
    .then(response => {
      const results = response.map(result => ({
        [from]: result.data.record.key[from],
        metrics: Object.fromEntries(
          Object.entries(result.data.record.metrics)
            .map(metric => {
              metric[1].value = metric[1].percentiles.p75;
              delete metric[1].percentiles;
              metric[1].histogram = metric[1].histogram.map(h => {
                h.density = parseFloat((h.density * 100).toFixed(2));
                return h;
              });
              metric[0] = metrics[metric[0]];
              return metric;
            })
        ),
      }));
      return results;
    })
    .catch(err => console.log('ERROR!', err.message));
}

module.exports = fetchPerformanceMetrics;
