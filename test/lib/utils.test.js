const utils = require('../../lib/utils.js');
const chai = require('chai');
const assert = chai.assert;

describe('Utils', () => {
  describe('#requestPayload', () => {
    it('returns valid payload', () => {
      let payload = utils.requestPayload('someAddress');
      assert.deepEqual(payload, {address: 'someAddress'});
    });
  });
});
