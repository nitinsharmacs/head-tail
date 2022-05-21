const assert = require('assert');
const { headMain,
  head,
  firstNLines,
  nBytesFrom } = require('../src/headLib.js');

const mockReadFileSync = (expectedFileNames, contents, expectedEncoding) => {
  let index = 0;
  return function (fileName, encoding) {
    assert.strictEqual(fileName, expectedFileNames[index]);
    assert.strictEqual(encoding, expectedEncoding);
    const actualContent = contents[index];
    index++;
    return actualContent;
  };
};

describe('headMain', () => {
  it('should get 1 line from the file', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-n', '1', 'file.txt'];
    assert.strictEqual(headMain(mockedReadFileSync, args), 'hello');
  });

  it('should get 2 byte from the file', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-c', '1', 'file.txt'];
    assert.strictEqual(headMain(mockedReadFileSync, args), 'h');
  });

  it('should give formatted error if file doesn\'t exist', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-c', '1', 'file.tx'];
    assert.strictEqual(headMain(mockedReadFileSync, args),
      'head: file.tx: No such file or directory');
  });

  it('should head multiple files with all files present', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const args = ['file.txt', 'file2.txt'];
    const stdout = '==> file.txt <==\nhello\n==> file2.txt <==\nworld';
    assert.strictEqual(headMain(mockedReadFileSync, args), stdout);
  });

  it('should head multiple files with one absent', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello'],
      'utf8');
    const args = ['file.txt', 'absent.txt'];
    const stdout = '==> file.txt <==\nhello\nhead: absent.txt: No such file or directory';
    assert.strictEqual(headMain(mockedReadFileSync, args), stdout);
  });

  it('should throw error if no file provided', () => {
    const mockedReadFileSync = mockReadFileSync([],
      [],
      'utf8');
    const args = [];
    assert.throws(() => headMain(mockedReadFileSync, args), {
      code: 'NOFILEPROVIDED',
      message: 'no file provided'
    });
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
