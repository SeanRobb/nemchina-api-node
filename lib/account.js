const axios = require('axios');
const utils = require('./utils');

const baseAccountUrl = 'http://explorer.nemchina.com/account';

const harvestBlocks = (address) => {
  let request = utils.requestPayload(address);
  return axios.post(`${baseAccountUrl}/loadHarvestBlocks`, request)
    .then((resp) => resp.data);
};

const txList = (address) => {
  let request = utils.requestPayload(address);
  return axios.post(`${baseAccountUrl}/detailTXList`, request)
    .then((resp) => resp.data);
};

const detail = (address) => {
  let request = utils.requestPayload(address);
  return axios.post(`${baseAccountUrl}/detail`, request)
    .then((resp) => resp.data);
};

module.exports = {
  baseAccountUrl,
  harvestBlocks,
  detail,
  txList,
};
