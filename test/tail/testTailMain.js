const assert = require('assert');
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
        { logger, errorLogger }), 0
    );
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
  });
});
