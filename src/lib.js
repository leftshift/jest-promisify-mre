const util = require('util');

function foo(a, cb) {
  cb(null, 'callback result');
}

foo[util.promisify.custom] = async (a) => 1

module.exports = { foo }
