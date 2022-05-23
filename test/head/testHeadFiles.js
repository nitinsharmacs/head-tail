const assert = require('assert');
const { headFiles } = require('../../src/head/headLib.js');
const { mockReadFileSync, mockLogger } = require('../../src/mockers.js');

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
