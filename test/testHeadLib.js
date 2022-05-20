const assert = require('assert');
const { head, firstNLines } = require('../src/headLib.js');

describe('head', () => {
  it('should get 1 line from the content', () => {
    assert.strictEqual(head('hello', 1), 'hello');
    assert.strictEqual(head('world\nhello', 1), 'world');
  });

  it('should get 2 lines from the content', () => {
    assert.strictEqual(head('world\nhello', 2), 'world\nhello');
  });

  it('should get same content if given lines exceeds content', () => {
    assert.strictEqual(head('world', 2), 'world');
  });
});

describe('firstNLines', () => {
  it('should get 1 line from the lines', () => {
    assert.deepStrictEqual(firstNLines(1, [
      'hello', 'world'
    ]), ['hello']);
    assert.deepStrictEqual(firstNLines(1, [
      'world'
    ]), ['world']);
  });

  it('should get 2 lines from the lines', () => {
    assert.deepStrictEqual(firstNLines(2, [
      'hello', 'world'
    ]), ['hello', 'world']);
  });

  it('should get 0 line from the lines', () => {
    assert.deepStrictEqual(firstNLines(0, [
      'hello', 'world'
    ]), []);
  });

  it('should get no line if no lines provided', () => {
    assert.deepStrictEqual(firstNLines(1, []), []);
  });
});
