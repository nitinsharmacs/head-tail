const assert = require('assert');

const { head,
  firstNLines,
  firstNBytes,
  assertFile,
  usage,
  createHeader } = require('../../src/head/headLib.js');

describe('head', () => {
  it('should get 1 line from the content', () => {
    const options = {
      askedForBytes: false,
      count: 1
    };
    assert.strictEqual(head('hello', options), 'hello');
    assert.strictEqual(head('world\nhello', options), 'world');
  });

  it('should get 2 lines from the content', () => {
    const options = {
      askedForBytes: false,
      count: 2
    };
    assert.strictEqual(head('world\nhello', options), 'world\nhello');
  });

  it('should get same content if given lines exceeds content', () => {
    const options = {
      askedForBytes: false,
      count: 2
    };
    assert.strictEqual(head('world', options), 'world');
  });

  it('should give 1 byte from the content', () => {
    const options = {
      askedForBytes: true,
      count: 1
    };
    assert.strictEqual(head('world', options), 'w');
  });

  it('should give 6 bytes from the content', () => {
    const options = {
      askedForBytes: true,
      count: 6
    };
    assert.strictEqual(head('world\nhello', options), 'world\n');
  });

  it('should give whole content if given bytes exceeds', () => {
    const options = {
      askedForBytes: true,
      count: 6
    };
    assert.strictEqual(head('world', options), 'world');
  });
});

describe('firstNLines', () => {
  it('should get 1 line from the lines', () => {
    assert.deepStrictEqual(firstNLines([
      'hello', 'world'
    ], 1), ['hello']);
    assert.deepStrictEqual(firstNLines([
      'world'
    ], 1), ['world']);
  });

  it('should get 2 lines from the lines', () => {
    assert.deepStrictEqual(firstNLines([
      'hello', 'world'
    ], 2), ['hello', 'world']);
  });

  it('should get 0 line from the lines', () => {
    assert.deepStrictEqual(firstNLines([
      'hello', 'world'
    ], 0), []);
  });

  it('should get no line if no lines provided', () => {
    assert.deepStrictEqual(firstNLines([], 1), []);
  });
});

describe('firstNBytes', () => {
  it('should give 1 byte from the content', () => {
    assert.strictEqual(firstNBytes('hello', 1), 'h');
  });

  it('should give 2 bytes from the content', () => {
    assert.strictEqual(firstNBytes('hello', 2), 'he');
  });

  it('should give 4 bytes from the content', () => {
    assert.strictEqual(firstNBytes('he\nme', 4), 'he\nm');
  });

  it('should give empty from the empty content', () => {
    assert.strictEqual(firstNBytes('', 4), '');
  });
});

describe('assertFile', () => {
  it('should throw error if no file given', () => {
    assert.throws(() => assertFile([]), {
      code: 'NO_FILE_PROVIDED',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('should not throw error if file given', () => {
    assert.doesNotThrow(() => assertFile(['file']));
  });
});

describe('usage', () => {
  it('should give head usage', () => {
    assert.strictEqual(usage(), 'usage: head [-n lines | -c bytes] [file ...]');
  });
});

describe('createHeader', () => {
  it('should give header of file name', () => {
    assert.strictEqual(createHeader('filename'), '==> filename <==\n');
  });
});
