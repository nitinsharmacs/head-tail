const assert = require('assert');
const { firstNLines } = require('../src/headLib.js');


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
