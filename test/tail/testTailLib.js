const assert = require('assert');
const { lastNLines } = require('../../src/tail/tailLib.js');

describe('lastNLines', () => {
  it('should give last 1 line', () => {
    assert.deepStrictEqual(lastNLines(['line1', 'line2'], 1), ['line2']);
  });

  it('should give last 2 lines', () => {
    assert.deepStrictEqual(lastNLines(
      ['line1', 'line2'], 2), ['line1', 'line2']
    );
  });

  it('should give whole content if line count exceeds', () => {
    assert.deepStrictEqual(lastNLines(
      ['line1', 'line2'], 3), ['line1', 'line2']
    );
  });

  it('should give 0 line', () => {
    assert.deepStrictEqual(lastNLines(
      ['line1', 'line2'], 0), []
    );
  });
});
