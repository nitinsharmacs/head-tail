const assert = require('assert');
const { parseOptions, parseFileNames } = require('../src/parseArgs.js');

describe('parseOptions', () => {
  it('should parse options separated by their values', () => {
    const args = ['-n', '4', '-c', '3', 'filename'];
    assert.deepStrictEqual(parseOptions(args), {
      '-n': 4,
      '-c': 3,
    });
  });

  it('should not parse options coming after filename', () => {
    const args = ['-n', '4', '-c', '3', 'filename', '-l', '4'];
    assert.deepStrictEqual(parseOptions(args), {
      '-n': 4,
      '-c': 3,
    });
  });
});

describe('parseFileNames', () => {
  it('should parse file name', () => {
    const args = ['-n', '4', 'filename'];
    assert.deepStrictEqual(parseFileNames(args), ['filename']);
  });

  it('should parse file names', () => {
    const args = ['-n', '4', 'filename', 'filename2'];
    assert.deepStrictEqual(parseFileNames(args), ['filename', 'filename2']);
  });

  it('should parse file names without options given', () => {
    const args = ['filename', 'filename2'];
    assert.deepStrictEqual(parseFileNames(args), ['filename', 'filename2']);
  });
});
