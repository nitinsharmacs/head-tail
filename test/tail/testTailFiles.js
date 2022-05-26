const assert = require('assert');
const { tailFiles } = require('../../src/tail/tailMain.js');
const { mockReadFileSync, mockLogger } = require('../../src/utils/mockers.js');

describe('tailFiles', () => {
  it('should tail file without heading', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello'],
      'utf8');
    const files = ['file.txt'];
    const options = {
      askedForBytes: false,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const logger = mockLogger(['hello']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(tailFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 0);
  });

  it('should tail files', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const files = ['file.txt', 'file2.txt'];
    const options = {
      askedForBytes: true,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const logger = mockLogger(['==> file.txt <==\no',
      '==> file2.txt <==\nd']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(tailFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 0);
  });

  it('should tail files when one file missing', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const files = ['file.txt', 'filee.txt'];
    const options = {
      askedForBytes: false,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const logger = mockLogger(['==> file.txt <==\nhello']);
    const errorLogger = mockLogger(
      ['tail: filee.txt: No such file or directory']);
    assert.strictEqual(tailFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 1);
  });

  it('should tail missing file', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt'],
      ['hello', 'world'],
      'utf8');
    const files = ['filee.txt'];
    const options = { askedForBytes: true, count: 1, supressHeadings: false };
    const logger = mockLogger([]);
    const errorLogger = mockLogger(
      ['tail: filee.txt: No such file or directory']);
    assert.strictEqual(tailFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 1);
  });

  it('should tail files with supressing headings', () => {
    const mockedReadFileSync = mockReadFileSync(['file.txt', 'file2.txt'],
      ['hello', 'world'],
      'utf8');
    const files = ['file.txt', 'file2.txt'];
    const options = { askedForBytes: true, count: 1, supressHeadings: true };
    const logger = mockLogger(['o',
      'd']);
    const errorLogger = mockLogger([]);
    assert.strictEqual(tailFiles(mockedReadFileSync,
      files,
      options,
      { logger, errorLogger }), 0);
  });
});
