const assert = require('assert');
const { headMain,
  head,
  headFiles,
  firstNLines,
  nBytesFrom,
  assertFile,
  usage,
  createHeader,
  noFileMessage } = require('../src/headLib.js');

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

const mockLogger = (expectedTexts) => {
  let index = 0;
  return function (actualText) {
    assert.strictEqual(actualText, expectedTexts[index]);
    index++;
  };
};

describe('headFiles', () => {
  it('should head file without heading', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const files = ['file.txt'];
    const options = { askedForBytes: true, count: 1 };
    const logger = mockLogger(['h']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(headFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 0);
  });

  it('should head files', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const files = ['file.txt', 'file2.txt'];
    const options = { askedForBytes: true, count: 1 };
    const logger = mockLogger(['==> file.txt <==\nh',
      '\n==> file2.txt <==\nw']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(headFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 0);
  });

  it('should head files when one file missing', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const files = ['file.txt', 'filee.txt'];
    const options = { askedForBytes: true, count: 1 };
    const logger = mockLogger(['==> file.txt <==\nh']);
    const errorLogger = mockLogger(
      ['head: filee.txt: No such file or directory']);
    assert.strictEqual(headFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 1);
  });

  it('should head missing file', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello', 'world'],
      'utf8');
    const files = ['filee.txt'];
    const options = { askedForBytes: true, count: 1 };
    const logger = mockLogger([]);
    const errorLogger = mockLogger(
      ['head: filee.txt: No such file or directory']);
    assert.strictEqual(headFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 1);
  });
});

describe('headMain', () => {
  it('should get 1 line from the file', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const logger = mockLogger(['hello']);
    const errorLogger = mockLogger([]);
    const args = ['-n', '1', 'file.txt'];
    assert.strictEqual(
      headMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
  });

  it('should get 1 byte from the file', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-c', '1', 'file.txt'];
    const logger = mockLogger(['h']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(
      headMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
  });

  it('should give formatted error if file doesn\'t exist', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-c', '1', 'file.tx'];
    const logger = mockLogger([]);
    const errorLogger = mockLogger(
      ['head: file.tx: No such file or directory']);
    assert.strictEqual(
      headMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 1
    );
  });

  it('should head multiple files with all files present', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const args = ['file.txt', 'file2.txt'];
    const logger = mockLogger([
      '==> file.txt <==\nhello',
      '\n==> file2.txt <==\nworld']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(
      headMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
  });

  it('should head multiple files with one absent', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello'],
      'utf8');
    const args = ['file.txt', 'absent.txt'];
    const logger = mockLogger(['==> file.txt <==\nhello']);
    const errorLogger = mockLogger([
      'head: absent.txt: No such file or directory']);
    assert.strictEqual(
      headMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 1
    );
  });

  it('should throw error if no file provided', () => {
    const mockedReadFileSync = mockReadFileSync([],
      [],
      'utf8');
    const args = [];
    const logger = mockLogger([]);
    const errorLogger = mockLogger([]);
    assert.throws(() => headMain(mockedReadFileSync,
      args,
      { logger, errorLogger }), {
      code: 'NO_FILE_PROVIDED',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('should give usage for --help', () => {
    const mockedReadFileSync = mockReadFileSync([],
      [],
      'utf8');
    const logger = mockLogger(['usage: head [-n lines | -c bytes] [file ...]']);
    const errorLogger = mockLogger([]);
    headMain(mockedReadFileSync, ['--help'], { logger, errorLogger });
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

describe('noFileMessage', () => {
  it('should give no file message', () => {
    assert.strictEqual(noFileMessage('file'),
      'file: No such file or directory');
  });
});
