const assert = require('assert');
const { tailFile, tailFiles } = require('../../src/tail/tailMain.js');
const { mockReadFileSync } = require('../../src/utils/mockers.js');

describe('tailFile', () => {
  it('should tail a present file', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt'],
      ['hello'],
      'utf8');
    const filename = 'file.txt';
    const options = {
      askedForBytes: false,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const expected = { text: 'hello' };
    const header = () => '';

    assert.deepStrictEqual(
      tailFile(filename, mockedReadFileSync, header, options),
      expected
    );
  });

  it('should tail an absent file', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt'],
      ['hello'],
      'utf8');
    const filename = 'file.tx';
    const options = {
      askedForBytes: false,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const expected = { error: { code: 'ENOENT', path: 'file.tx' } };
    const header = () => '';

    assert.deepStrictEqual(
      tailFile(filename, mockedReadFileSync, header, options),
      expected
    );
  });
});

describe('tailFiles', () => {
  it('should tail present files', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['file.txt', 'file2.txt'];
    const options = {
      askedForBytes: true,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const expected = [
      { text: '==> file.txt <==\nd' },
      { text: '==> file2.txt <==\no' }
    ];

    assert.deepStrictEqual(
      tailFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });

  it('should tail files with some non-exisitg files', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['file.txt', 'badFile.txt'];
    const options = {
      askedForBytes: true,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const expected = [
      { text: '==> file.txt <==\nd' },
      { error: { code: 'ENOENT', path: 'badFile.txt' } }
    ];

    assert.deepStrictEqual(
      tailFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });

  it('should tail all non-exisitg files', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['badFile1.txt', 'badFile2.txt'];
    const options = {
      askedForBytes: true,
      relativeToBeginning: false,
      supressHeadings: false,
      count: 1
    };
    const expected = [
      { error: { code: 'ENOENT', path: 'badFile1.txt' } },
      { error: { code: 'ENOENT', path: 'badFile2.txt' } }
    ];

    assert.deepStrictEqual(
      tailFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });

  it('should tail by suppressing headers', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['file.txt', 'file2.txt'];
    const options = {
      askedForBytes: true,
      relativeToBeginning: false,
      supressHeadings: true,
      count: 1
    };
    const expected = [
      { text: 'd' },
      { text: 'o' }
    ];

    assert.deepStrictEqual(
      tailFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });

  it('should tail by suppressing headers with a non-existing file', () => {
    const mockedReadFileSync = mockReadFileSync(
      ['file.txt', 'file2.txt'],
      ['world', 'hello'],
      'utf8');
    const filenames = ['file.txt', 'badFile.txt'];
    const options = {
      askedForBytes: true,
      relativeToBeginning: false,
      supressHeadings: true,
      count: 1
    };
    const expected = [
      { text: 'd' },
      { error: { code: 'ENOENT', path: 'badFile.txt' } }
    ];

    assert.deepStrictEqual(
      tailFiles(filenames, mockedReadFileSync, options),
      expected
    );
  });
});
