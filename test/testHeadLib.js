const assert = require('assert');
const { headMain,
  head,
  firstNLines,
  nBytesFrom,
  compileOptions } = require('../src/headLib.js');

const mockReadFileSync = (expectedFileName, expectedEncoding, content) => {
  return function (fileName, encoding) {
    assert.strictEqual(fileName, expectedFileName);
    assert.strictEqual(encoding, expectedEncoding);
    return content;
  };
};

describe('headMain', () => {
  it('should get 1 line from the file', () => {
    const mockedReadFileSync = mockReadFileSync('file.txt', 'utf8', 'hello');
    const args = ['-n', '1', 'file.txt'];
    assert.strictEqual(headMain(mockedReadFileSync, args), 'hello');
  });

  it('should get 2 byte from the file', () => {
    const mockedReadFileSync = mockReadFileSync('file.txt', 'utf8', 'hello');
    const args = ['-c', '1', 'file.txt'];
    assert.strictEqual(headMain(mockedReadFileSync, args), 'h');
  });
});

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

describe('nBytesFrom', () => {
  it('should give 1 byte from the content', () => {
    assert.strictEqual(nBytesFrom('hello', 1), 'h');
  });

  it('should give 2 bytes from the content', () => {
    assert.strictEqual(nBytesFrom('hello', 2), 'he');
  });

  it('should give 4 bytes from the content', () => {
    assert.strictEqual(nBytesFrom('he\nme', 4), 'he\nm');
  });

  it('should give empty from the empty content', () => {
    assert.strictEqual(nBytesFrom('', 4), '');
  });
});

describe('compileOptions', () => {
  it('should set options for getting line', () => {
    const options = {
      '-n': 2
    };
    assert.deepStrictEqual(compileOptions(options), {
      askedForBytes: false,
      count: 2
    });
  });

  it('should set options for getting bytes', () => {
    const options = {
      '-c': 2
    };
    assert.deepStrictEqual(compileOptions(options), {
      askedForBytes: true,
      count: 2
    });
  });
});
