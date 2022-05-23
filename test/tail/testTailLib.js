const assert = require('assert');
const { lastNLines,
  lastNBytes,
  linesStartingAt,
  tail } = require('../../src/tail/tailLib.js');

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

describe('lastNBytes', () => {
  it('should give last 1 byte', () => {
    assert.strictEqual(lastNBytes('hello', 1), 'o');
  });

  it('should give last 2 bytes', () => {
    assert.strictEqual(lastNBytes('hello', 2), 'lo');
  });

  it('should give last 0 byte', () => {
    assert.strictEqual(lastNBytes('hello', 0), '');
  });

  it('should give whole content if bytes counts exceed', () => {
    assert.strictEqual(lastNBytes('hello', 6), 'hello');
  });
});

describe('tail', () => {
  it('should give last 1 line', () => {
    const content = 'line1\nline2'
    assert.strictEqual(tail(content, {
      askedForBytes: false, count: 1
    }), 'line2');
  });

  it('should give last 1 byte', () => {
    const content = 'line1\nline2'
    assert.strictEqual(tail(content, {
      askedForBytes: true, count: 1
    }), '2');
  });
});

describe('linesStartingAt', () => {
  it('should give lines from line 1', () => {
    const lines = ['line1', 'line2'];
    const expected = ['line1', 'line2'];
    assert.deepStrictEqual(linesStartingAt(lines, 1), expected);
  });

  it('should give lines from line 2', () => {
    const lines = ['line1', 'line2'];
    const expected = ['line2'];
    assert.deepStrictEqual(linesStartingAt(lines, 2), expected);
  });

  it('should give all lines if count is 0', () => {
    const lines = ['line1', 'line2'];
    const expected = ['line1', 'line2'];
    assert.deepStrictEqual(linesStartingAt(lines, 0), expected);
  });
});
