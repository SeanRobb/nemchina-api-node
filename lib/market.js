const axios = require('axios');
const marketBaseUrl = 'http://explorer.nemchina.com/market';

const get = () => {
  return axios.post(`${marketBaseUrl}/market`)
    .then((resp) => resp.data);
};

module.exports = {
  get,
};
