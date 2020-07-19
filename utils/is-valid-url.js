const { URL } = require('url');

module.exports = function isValidUrl(url) {
  try {
    return new URL(url);
  } catch {
    return false;
  }
}
