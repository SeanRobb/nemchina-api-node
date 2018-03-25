const account = require('../../lib/account.js');
const utils = require('../../lib/utils');
const moxios = require('moxios');
const sinon = require('sinon');
const stub = sinon.stub;
const chai = require('chai');
const assert = chai.assert;
const faker = require('faker');
const randomAddress = faker.finance.bitcoinAddress;
const baseAccountUrl = account.baseAccountUrl;

describe('Account', () => {
  let requestPayloadStubs;
  let address;
  let requestObject;

  let harvestBlocksResponse = {
    allBlocks: 32,
    dayBlocks: 0,
    monthBlocks: 0,
    allFee: 403,
    dayFee: 0,
    monthFee: 0,
    allBlocksPerFee: '12.59',
    dayBlocksPerFee: 0,
    monthBlocksPerFee: 0,
    allBlocksPerFeeInUSD: '3.512',
    dayBlocksPerFeeInUSD: 0,
    monthBlocksPerFeeInUSD: 0,
    allBlocksPerFeeInBTC: '0.00041018',
    dayBlocksPerFeeInBTC: 0,
    monthBlocksPerFeeInBTC: 0,
  };
  let accountDetailResponse = {
    address: randomAddress(),
    publicKey: 'somePublicKey',
    balance: 12009800000,
    importance: 0.000009393944574274786,
    label: null,
    remoteStatus: 'ACTIVE',
    harvestedBlocks: 32,
    vestedBalance: 12009789920,
  };
  let accountTxResponse = [
    {
      _id: 'SomeId',
      hash: 'SomeHash',
      height: 1365724,
      sender: 'SomeSender',
      recipient: 'SomeReciever',
      amount: 2000000000,
      fee: 4000000,
      timeStamp: 82684153,
      deadline: 82731353,
      signature: 'someSignature',
      type: 257,
      __v: 0,
    },
    {
      _id: 'SomeId',
      hash: 'SomeHash',
      height: 1365724,
      sender: 'SomeSender',
      recipient: 'SomeReciever',
      amount: 2000000000,
      fee: 4000000,
      timeStamp: 82684153,
      deadline: 82731353,
      signature: 'someSignature',
      type: 257,
      __v: 0,
    },
  ];

  beforeEach(() => {
    moxios.install();
    requestPayloadStubs = stub(utils, 'requestPayload');
    address = randomAddress();
  });

  afterEach(() => {
    moxios.uninstall();
    requestPayloadStubs.restore();
  });

  describe('#harvestBlocks', () => {
    beforeEach(() => {
      moxios.stubRequest(`${baseAccountUrl}/loadHarvestBlocks`, {
        status: 200,
        response: harvestBlocksResponse,
      });
    });

    it('returns correct payload', () => {
      return account.harvestBlocks()
        .then((payload) => {
          assert.deepEqual(payload, harvestBlocksResponse);
        });
    });

    it('calls requestPayload properly', () => {
      return account.harvestBlocks(address)
        .then((payload) => {
          assert(requestPayloadStubs.withArgs(address).calledOnce);
        });
    });

    it('calls axios properly', (done) => {
      requestPayloadStubs.withArgs(address).returns(requestObject);

      account.harvestBlocks(address);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        assert.equal(request.config.method, 'post');
        assert.equal(request.config.url, `${baseAccountUrl}/loadHarvestBlocks`);
        assert.equal(request.config.payload, requestObject);
        done();
      });
    });
  });

  describe('#detail', () => {
    beforeEach(() => {
      moxios.stubRequest(`${baseAccountUrl}/detail`, {
        status: 200,
        response: accountDetailResponse,
      });
    });

    it('returns correct payload', () => {
      return account.detail()
        .then((payload) => {
          assert.deepEqual(payload, accountDetailResponse);
        });
    });

    it('calls requestPayload properly', () => {
      return account.detail(address)
        .then((payload) => {
          assert(requestPayloadStubs.withArgs(address).calledOnce);
        });
    });

    it('calls axios properly', (done) => {
      requestPayloadStubs.withArgs(address).returns(requestObject);

      account.detail(address);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        assert.equal(request.config.method, 'post');
        assert.equal(request.config.url, `${baseAccountUrl}/detail`);
        assert.equal(request.config.payload, requestObject);
        done();
      });
    });
  });

  describe('#getAccountDetailTxList', () => {
    beforeEach(() => {
      moxios.stubRequest(`${baseAccountUrl}/detailTXList`, {
        status: 200,
        response: accountTxResponse,
      });
    });

    it('returns correct payload', () => {
      return account.txList()
        .then((payload)=>{
          assert.isArray(payload);
          assert.deepEqual(payload, accountTxResponse);
        });
    });

    it('calls requestPayload properly', () => {
      return account.txList(address)
        .then((payload) => {
          assert(requestPayloadStubs.withArgs(address).calledOnce);
        });
    });

    it('calls axios properly', (done) => {
      requestPayloadStubs.withArgs(address).returns(requestObject);

      account.txList(address);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        assert.equal(request.config.method, 'post');
        assert.equal(request.config.url, `${baseAccountUrl}/detailTXList`);
        assert.equal(request.config.payload, requestObject);
        done();
      });
    });
  });
});
