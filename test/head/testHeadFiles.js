const assert = require('assert');
const { headFile,
  headFiles,
  printHeadOfFiles } = require('../../src/head/headLib.js');
const { mockReadFileSync, mockLogger } = require('../../src/utils/mockers.js');

describe('headFile', () => {
  it('should head a present file', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt'],
      ['hello'],
      'utf8');
    const filename = 'file.txt';
    const options = { askedForBytes: false, count: 1 };
    const expected = { text: 'hello' };
    const header = () => '';

    assert.deepStrictEqual(
      headFile(filename, mockedReadFileSync, header, options),
      expected
    );
  });

  it('should head an absent file', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt'],
      ['hello'],
      'utf8');
    const filename = 'file.tx';
    const options = { askedForBytes: false, count: 1 };
    const expected = { error: { code: 'ENOENT', path: 'file.tx' } };
    const header = () => '';

    assert.deepStrictEqual(
      headFile(filename, mockedReadFileSync, header, options),
      expected
    );
  });
});

describe('headFiles', () => {
  it('should head present files', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['file.txt', 'file2.txt'];
    const options = { askedForBytes: false, count: 1 };
    const expected = [
      { text: '==> file.txt <==\nworld' },
      { text: '==> file2.txt <==\nhello' }
    ];

    assert.deepStrictEqual(
      headFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });

  it('should head files with some non-exisitg files', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['file.txt', 'badFile.txt'];
    const options = { askedForBytes: false, count: 1 };
    const expected = [
      { text: '==> file.txt <==\nworld' },
      { error: { code: 'ENOENT', path: 'badFile.txt' } }
    ];

    assert.deepStrictEqual(
      headFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });

  it('should head all non-exisitg files', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['badFile1.txt', 'badFile2.txt'];
    const options = { askedForBytes: false, count: 1 };
    const expected = [
      { error: { code: 'ENOENT', path: 'badFile1.txt' } },
      { error: { code: 'ENOENT', path: 'badFile2.txt' } }
    ];

    assert.deepStrictEqual(
      headFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });
});

describe('printHeadOfFiles', () => {
  it('should print single head of file', () => {
    const headOfFiles = [
      { text: 'hello' }
    ];
    const logger = mockLogger(['hello']);
    const errorLogger = mockLogger([]);
    printHeadOfFiles(headOfFiles, { logger, errorLogger });
  });

  it('should print head of file with error', () => {
    const headOfFiles = [
      { text: '==> file.txt <==\nworld' },
      { error: { code: 'ENOENT', path: 'badFile.txt' } }
    ];
    const logger = mockLogger(['==> file.txt <==\nworld']);
    const errorLogger = mockLogger([
      'head: badFile.txt: No such file or directory'
    ]);

    printHeadOfFiles(headOfFiles, { logger, errorLogger });
  });

  it('should print errors if all files missing', () => {
    const headOfFiles = [
      { error: { code: 'ENOENT', path: 'badFile1.txt' } },
      { error: { code: 'ENOENT', path: 'badFile2.txt' } }
    ];
    const logger = mockLogger([]);
    const errorLogger = mockLogger([
      'head: badFile1.txt: No such file or directory',
      'head: badFile2.txt: No such file or directory'
    ]);

    printHeadOfFiles(headOfFiles, { logger, errorLogger });
  });

});
