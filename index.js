const account = require('./lib/account');
const market = require('./lib/market');

const getAccountDetail = (address) => {
  return account.detail(address);
};

const getAccountTxList = (address) => {
  return account.txList(address);
};

const getAccountHarvestBlocks = (address) => {
  return account.harvestBlocks(address);
};

const getMarket = () => {
  return market.get();
};


module.exports = {
  getAccountDetail,
  getAccountTxList,
  getAccountHarvestBlocks,
  getMarket,
};
