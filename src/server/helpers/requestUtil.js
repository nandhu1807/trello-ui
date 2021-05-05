const rp = require('promise-request-retry');

function post(options) {
  return rp(options);
}

module.exports = {
  post,
};
