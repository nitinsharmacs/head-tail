const assert = require('assert');
const { splitLines, joinLines } = require('../../src/utils/stringUtils.js');

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

describe('joinLines', () => {
  it('should join 1 line', () => {
    assert.strictEqual(joinLines(['hello']), 'hello');
  });

  it('should join 2 lines', () => {
    assert.strictEqual(joinLines(['hello', 'world']), 'hello\nworld');
  });

  it('should join no lines', () => {
    assert.strictEqual(joinLines([]), '');
  });
});
