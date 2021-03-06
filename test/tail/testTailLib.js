const assert = require('assert');
const { lastNLines,
  lastNBytes,
  linesStartingAt,
  bytesStartingAt,
  linesFrom,
  bytesFrom,
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

  it('should give nothing if count exceeds', () => {
    const lines = ['line1', 'line2'];
    const expected = [];
    assert.deepStrictEqual(linesStartingAt(lines, 3), expected);
  });
});

describe('bytesStartingAt', () => {
  it('should give bytes from position 1', () => {
    const content = 'hello';
    const expected = 'hello';
    assert.deepStrictEqual(bytesStartingAt(content, 1), expected);
  });

  it('should give bytes from position 2', () => {
    const content = 'hello';
    const expected = 'ello';
    assert.deepStrictEqual(bytesStartingAt(content, 2), expected);
  });

  it('should give all bytes if count is 0', () => {
    const content = 'hello';
    const expected = 'hello';
    assert.deepStrictEqual(bytesStartingAt(content, 0), expected);
  });

  it('should give nothing if position exceeds the content size', () => {
    const content = 'hello';
    const expected = '';
    assert.deepStrictEqual(bytesStartingAt(content, 8), expected);
  });
});

describe('linesFrom', () => {
  it('should give last 1 line', () => {
    const content = 'line1\nline2';
    const options = {
      count: 1,
      relativeToBeginning: false
    };
    assert.strictEqual(linesFrom(content, options), 'line2');
  });

  it('should give lines from line 1', () => {
    const content = 'line1\nline2';
    const expected = 'line1\nline2';
    const options = {
      count: 1,
      relativeToBeginning: true
    };
    assert.strictEqual(linesFrom(content, options), expected);
  });
});

describe('bytesFrom', () => {
  it('should give last 1 byte', () => {
    const content = 'line1\nline2';
    const expected = '2';
    const options = {
      count: 1,
      relativeToBeginning: false
    };
    assert.strictEqual(bytesFrom(content, options), expected);
  });

  it('should give bytes from byte 1', () => {
    const content = 'line1\nline2';
    const expected = 'line1\nline2';
    const options = {
      count: 1,
      relativeToBeginning: true
    };
    assert.strictEqual(bytesFrom(content, options), expected);
  });
});

describe('tail', () => {
  it('should give last 1 line', () => {
    const content = 'line1\nline2';
    const expected = 'line2';
    const options = {
      askedForBytes: false, relativeToBeginning: false, count: 1
    };
    assert.strictEqual(tail(content, options), expected);
  });

  it('should give last 1 byte', () => {
    const content = 'line1\nline2';
    const expected = '2';
    const options = {
      askedForBytes: true, relativeToBeginning: false, count: 1
    };
    assert.strictEqual(tail(content, options), expected);
  });

  it('should give lines from line 1', () => {
    const content = 'line1\nline2';
    const expected = 'line1\nline2';
    const options = {
      askedForBytes: false, relativeToBeginning: true, count: 1
    };
    assert.strictEqual(tail(content, options), expected);
  });

  it('should give bytes from byte 2', () => {
    const content = 'line1\nline2';
    const expected = 'ine1\nline2';
    const options = {
      askedForBytes: true, relativeToBeginning: true, count: 2
    };
    assert.strictEqual(tail(content, options), expected);
  });
});
