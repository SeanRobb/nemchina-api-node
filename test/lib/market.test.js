const market = require('../../lib/market.js');
const chai = require('chai');
const moxios = require('moxios');
const assert = chai.assert;

describe('Market', () => {
  let url = 'http://explorer.nemchina.com/market/market';
  let marketResponse = {
    usd: '0.27885',
    btc: '0.00003257',
    cap: '2509650000.0',
  };

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(url, {
      status: 200,
      response: marketResponse,
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns correct payload', () => {
    return market.get()
      .then((payload) => {
        assert.deepEqual(payload, marketResponse);
      });
  });

  it('calls axios properly', (done) => {
    market.get();
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      assert.equal(request.config.method, 'post');
      assert.equal(request.config.url, url);
      done();
    });
  });
});
