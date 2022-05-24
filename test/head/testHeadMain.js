const assert = require('assert');
const { validateOption } = require('../../src/head/validators.js');
const { headMain } = require('../../src/head/headLib.js');
const { mockReadFileSync, mockLogger } = require('../../src/mockers.js');

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
        { logger, errorLogger }, validateOption), 0
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
        { logger, errorLogger }, validateOption), 0
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
        { logger, errorLogger }, validateOption), 1
    );
  });

  it('should head multiple files with all files present', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const args = ['file.txt', 'file2.txt'];
    const logger = mockLogger([
      '==> file.txt <==\nhello',
      '\n==> file2.txt <==\nworld'
    ]);
    const errorLogger = mockLogger([]);
    assert.strictEqual(
      headMain(mockedReadFileSync,
        args,
        { logger, errorLogger }, validateOption), 0
    );
  });

  it('should head multiple files with one absent', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello'],
      'utf8');
    const args = ['file.txt', 'absent.txt'];
    const logger = mockLogger(['==> file.txt <==\nhello']);
    const errorLogger = mockLogger([
      'head: absent.txt: No such file or directory'
    ]);
    assert.strictEqual(
      headMain(mockedReadFileSync,
        args,
        { logger, errorLogger }, validateOption), 1
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
      { logger, errorLogger }, validateOption), {
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
