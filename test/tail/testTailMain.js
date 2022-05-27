const assert = require('assert');
const { mockReadFileSync, mockLogger } = require('../../src/utils/mockers.js');
const {
  getExitCode,
  tailMain,
  printTailOfFiles } = require('../../src/tail/tailMain.js');

describe('printTailOfFiles', () => {
  it('should print single tail of file', () => {
    const headOfFiles = [
      { text: 'hello' }
    ];
    const logger = mockLogger(['hello']);
    const errorLogger = mockLogger([]);
    printTailOfFiles(headOfFiles, { logger, errorLogger });
    assert.ok(logger.isCalled());
  });

  it('should print tail of file with error', () => {
    const headOfFiles = [
      { text: '==> file.txt <==\nworld' },
      { error: { code: 'ENOENT', path: 'badFile.txt' } }
    ];
    const logger = mockLogger(['==> file.txt <==\nworld']);
    const errorLogger = mockLogger([
      'tail: badFile.txt: No such file or directory'
    ]);

    printTailOfFiles(headOfFiles, { logger, errorLogger });
    assert.ok(logger.isCalled() && errorLogger.isCalled());
  });

  it('should print errors if all files missing', () => {
    const headOfFiles = [
      { error: { code: 'ENOENT', path: 'badFile1.txt' } },
      { error: { code: 'ENOENT', path: 'badFile2.txt' } }
    ];
    const logger = mockLogger([]);
    const errorLogger = mockLogger([
      'tail: badFile1.txt: No such file or directory',
      'tail: badFile2.txt: No such file or directory'
    ]);

    printTailOfFiles(headOfFiles, { logger, errorLogger });
    assert.ok(errorLogger.isCalled());
  });

});

describe('tailMain', () => {
  it('should get last 1 line [Non combined option]', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const logger = mockLogger(['hello']);
    const errorLogger = mockLogger([]);
    const args = ['-n', '1', 'file.txt'];
    assert.strictEqual(
      tailMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
    assert.ok(logger.isCalled());
  });

  it('should get lines from 1 line [Non combined option]', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello\nworld'],
      'utf8');
    const args = ['-n', '+1', 'file.txt'];
    const logger = mockLogger(['hello\nworld']);
    const errorLogger = mockLogger([]);

    assert.strictEqual(
      tailMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
    assert.ok(logger.isCalled());
  });

  it('should get last 1 byte [Non combined option]', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-c', '1', 'file.txt'];
    const logger = mockLogger(['o']);
    const errorLogger = mockLogger([]);

    assert.strictEqual(
      tailMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
    assert.ok(logger.isCalled());
  });

  it('should get last 1 line [Combined option]', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const logger = mockLogger(['hello']);
    const errorLogger = mockLogger([]);
    const args = ['-n1', 'file.txt'];
    assert.strictEqual(
      tailMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
    assert.ok(logger.isCalled());
  });

  it('should get last 1 byte [Combined option]', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-c1', 'file.txt'];
    const logger = mockLogger(['o']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(
      tailMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
    assert.ok(logger.isCalled());
  });

  it('should give nothing for 0 lines count', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-n0', 'file.txt'];
    const logger = mockLogger(['']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(
      tailMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
    assert.ok(logger.isCalled());
  });

  it('should give nothing for 0 bytes count', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const args = ['-c0', 'file.txt'];
    const logger = mockLogger(['']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(
      tailMain(mockedReadFileSync,
        args,
        { logger, errorLogger }), 0
    );
    assert.ok(logger.isCalled());
  });

  it('should give usage for --help', () => {
    const mockedReadFileSync = mockReadFileSync([],
      [],
      'utf8');
    const logger = mockLogger(
      ['usage: tail [-r] [-q] [-c # | -n #] [file ...]']);
    const errorLogger = mockLogger([]);
    tailMain(mockedReadFileSync, ['--help'], { logger, errorLogger });
    assert.ok(logger.isCalled());
  });
});

describe('getExitCode [tail]', () => {
  it('should give 1 exit code for error', () => {
    const headOfFiles = [
      { text: '==> file.txt <==\nworld' },
      { error: { code: 'ENOENT', path: 'badFile.txt' } }
    ];
    assert.strictEqual(getExitCode(headOfFiles), 1);
  });

  it('should give 0 exit code for no error', () => {
    const headOfFiles = [
      { text: '==> file.txt <==\nworld' },
    ];
    assert.strictEqual(getExitCode(headOfFiles), 0);
  });
});
