const assert = require('assert');
const { validateOption } = require('../../src/head/validators.js');
const { mockReadFileSync, mockLogger } = require('../../src/mockers.js');
const { tailMain } = require('../../src/tail/tailMain.js');

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
        { logger, errorLogger }, validateOption), 0
    );
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
        { logger, errorLogger }, validateOption), 0
    );
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
        { logger, errorLogger }, validateOption), 0
    );
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
        { logger, errorLogger }, validateOption), 0
    );
  });
});
