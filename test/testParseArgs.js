const assert = require('assert');
const { parseOptions,
  parseFileNames,
  parseArgs, validateOption } = require('../src/parseArgs.js');

describe('parseOptions', () => {
  it('should parse options separated by their values', () => {
    assert.deepStrictEqual(parseOptions(['-n', '4', 'filename'], {}), {
      '-n': 4,
    });
    assert.deepStrictEqual(parseOptions(['-c', '3', 'filename'], {}), {
      '-c': 3,
    });
  });

  it('should not parse options coming after filename', () => {
    const args = ['filename', '-c', '3'];
    assert.deepStrictEqual(parseOptions(args, {}), {});
  });

  it('should parse combined options', () => {
    const args = ['-c3', 'filename'];
    assert.deepStrictEqual(parseOptions(args, {}), {
      '-c': 3
    });
  });

  it('should parse options when filenames come at first', () => {
    const args = ['filename', 'filename2', '-n', '1', '-c1'];
    assert.deepStrictEqual(parseOptions(args, {}), {
    });
  });

  it('should throw error for invalid option', () => {
    const args = ['-l1', '-c', '2'];
    assert.throws(() => parseOptions(args, {}), {
      name: 'ILLEGAL_OPTION',
      message: 'illegal option -- l'
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

  it('should parse when filenames comes at first', () => {
    const args = ['filename', 'filename2', '-n', '1', '-c1'];
    assert.deepStrictEqual(parseArgs(args), {
      filenames: ['filename', 'filename2', '-n', '1', '-c1'],
      options: {
      }
    });
  });
});

describe('validateOption', () => {
  it('should validate invalid option', () => {
    const newOption = { '-j': 1 };
    const prevOptions = {};
    assert.throws(() => validateOption(newOption, prevOptions), {
      name: 'ILLEGAL_OPTION',
      message: 'illegal option -- j'
    });
  });

  it('should validate -n option if -c is already present', () => {
    const newOption = { '-c': 1 };
    const prevOptions = { '-n': 2 };
    assert.throws(() => validateOption(newOption, prevOptions), {
      name: 'CANTCOMBINE',
      message: 'can\'t combine line and byte counts'
    });
  });
});
