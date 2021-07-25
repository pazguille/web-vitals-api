const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

function buildUrl(options) {
  const url = `https://www.${ options.host || 'google.com' }/search`;
  const queryparams = querystring.stringify(options.qs);
  return `${ url }?${ queryparams }`;
}

function extractResults(body) {
  const results = [];
  const $ = cheerio.load(body);
  // Get the links matching to the web sites
  $('body').find('h3.zBAuLc').each((i, h3) => {
    const node = $(h3);
    if (node.parent()) {
      const href = node.parent().attr('href');
      if (href) {
        const link = new URL(href).searchParams.get('q');
        const domain = new URL(link).hostname;
        const result = {
          position: i+1,
          title: node.text(),
          link,
          domain,
        }
        results.push(result);
      }
    }
  });

  return results;
}

async function fetchSerpResults(options) {
  const response = await axios.get('http://anonymouse.org/cgi-bin/anon-www.cgi/' + buildUrl(options), {
    responseType: 'arraybuffer',
    reponseEncoding: 'binary',
  });

  if (response && response.status !== 200) {
    throw new Error(`Invalid HTTP status code on ${ options.url }`);
  }
  return extractResults(response.data.toString('latin1'));
}

module.exports = fetchSerpResults;
