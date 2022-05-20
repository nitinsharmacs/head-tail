const assert = require('assert');
const { parseOptions,
  parseFileNames,
  parseArgs } = require('../src/parseArgs.js');

describe('parseOptions', () => {
  it('should parse options separated by their values', () => {
    const args = ['-n', '4', '-c', '3', 'filename'];
    assert.deepStrictEqual(parseOptions(args, {}), {
      '-n': 4,
      '-c': 3,
    });
  });

  it('should not parse options coming after filename', () => {
    const args = ['-n', '4', '-c', '3', 'filename', '-l', '4'];
    assert.deepStrictEqual(parseOptions(args, {}), {
      '-n': 4,
      '-c': 3,
    });
  });

  it('should parse combined options', () => {
    const args = ['-c3', 'filename', '-l', '4'];
    assert.deepStrictEqual(parseOptions(args, {}), {
      '-c': 3
    });
  });

  it('should parse both separated and combined options', () => {
    const args = ['-n', '1', '-c3', 'filename', '-l', '4'];
    assert.deepStrictEqual(parseOptions(args, {}), {
      '-c': 3,
      '-n': 1
    });
  });

  it('should parse options when filenames come at first', () => {
    const args = ['filename', 'filename2', '-n', '1', '-c1'];
    assert.deepStrictEqual(parseOptions(args, {}), {
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

  it('should parse file names with values separated options', () => {
    const args = ['-n1', 'filename', 'filename2'];
    assert.deepStrictEqual(parseFileNames(args), ['filename', 'filename2']);
  });
});

describe('parseArgs', () => {
  it('should parse combined options and filenames', () => {
    const args = ['-n1', 'filename', 'filename2'];
    assert.deepStrictEqual(parseArgs(args), {
      filenames: ['filename', 'filename2'],
      options: {
        '-n': 1
      }
    });
  });

  it('should parse separated options and filenames', () => {
    const args = ['-n', '1', 'filename', 'filename2'];
    assert.deepStrictEqual(parseArgs(args), {
      filenames: ['filename', 'filename2'],
      options: {
        '-n': 1
      }
    });
  });

  it('should parse both combied and separated options and filenames', () => {
    const args = ['-n', '1', '-c1', 'filename', 'filename2'];
    assert.deepStrictEqual(parseArgs(args), {
      filenames: ['filename', 'filename2'],
      options: {
        '-n': 1,
        '-c': 1
      }
    });
  });

  it('should parse when filenames comes at first', () => {
    const args = ['filename', 'filename2', '-n', '1', '-c1'];
    assert.deepStrictEqual(parseArgs(args), {
      filenames: ['filename', 'filename2', '-n', '1', '-c1'],
      options: {
      }
    });
  });
});
