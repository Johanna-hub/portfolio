require('env2')('config.env');

const { API_key } = process.env;

module.exports = API_key;
