const axios = require('axios');

const API_URL = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';
const query = { key: process.env.CRUX_TOKEN };
const data = { formFactor: 'PHONE' };

const metrics = {
  first_contentful_paint: 'FCP',
  largest_contentful_paint: 'LCP',
  first_input_delay: 'FID',
  cumulative_layout_shift: 'CLS',
};

async  function fetchVitalsFromCrux(from, url) {
  return axios.post(API_URL, { ...data,  [from]: url }, { params: query })
    .catch(err => console.log('ERROR!', err.response && err.response.data));
}

async function fetchPerformanceMetrics(from, sites) {
  const promises = sites.map(url => fetchVitalsFromCrux(from, url));
  return Promise.all(promises)
    .then(response => {
      const results = response.map(result => ({
        [from]: result.data.record.key[from],
        metrics: Object.fromEntries(
          Object.entries(result.data.record.metrics)
            .map(b => {b[0] = metrics[b[0]]; return b})
        ),
      }));
      return results;
    })
    .catch(err => console.log('ERROR!', err.message));
}

module.exports = fetchPerformanceMetrics;
