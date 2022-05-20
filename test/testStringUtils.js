const assert = require('assert');
const { splitLines } = require('../src/stringUtils');

describe('splitLines', () => {
  it('should split content of 1 line', () => {
    assert.deepStrictEqual(splitLines('hello'), ['hello']);
  });

  it('should split content of 2 lines', () => {
    assert.deepStrictEqual(splitLines('hello\nworld'), ['hello', 'world']);
  });

  it('should split empty content', () => {
    assert.deepStrictEqual(splitLines(''), ['']);
  });
});
