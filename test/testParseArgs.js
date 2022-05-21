const assert = require('assert');
const { parseOptions,
  parseFileNames,
  parseArgs,
  compileOption,
  separateCombinedOption } = require('../src/parseArgs.js');

describe('separateCombinedOption', () => {
  it('should separate option having numerical value', () => {
    assert.deepStrictEqual(separateCombinedOption('-c1'), { '-c': '1' });
  });

  it('should separate option having alphanumerical value', () => {
    assert.deepStrictEqual(separateCombinedOption('-cd1'), { '-c': 'd1' });
  });
});

describe('parseOptions', () => {
  it('should parse options separated by their values', () => {
    assert.deepStrictEqual(parseOptions(['-n', '4', 'filename'], {}), {
      '-n': '4',
    });
    assert.deepStrictEqual(parseOptions(['-c', '3', 'filename'], {}), {
      '-c': '3',
    });
  });

  it('should not parse options coming after filename', () => {
    const args = ['filename', '-c', '3'];
    assert.deepStrictEqual(parseOptions(args, {}), {});
  });

  it('should parse combined options', () => {
    const args = ['-c2', 'filename'];
    assert.deepStrictEqual(parseOptions(args, {}), {
      '-c': '2'
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
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- l'
    });
  });

  it('should throw error for invalid option value', () => {
    const args = ['-csd'];
    assert.throws(() => parseOptions(args, {}), {
      code: 'ILLEGALCOUNT',
      message: 'illegal byte count -- sd'
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
        askedForBytes: false,
        count: 1
      }
    });
  });

  it('should parse separated options and filenames', () => {
    const args = ['-n', '1', 'filename', 'filename2'];
    assert.deepStrictEqual(parseArgs(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        count: 1
      }
    });
  });

  it('should parse when filenames comes at first', () => {
    const args = ['filename', 'filename2', '-n', '1', '-c1'];
    assert.deepStrictEqual(parseArgs(args), {
      filenames: ['filename', 'filename2', '-n', '1', '-c1'],
      options: {
        askedForBytes: false,
        count: 10
      }
    });
  });
});

describe('compileOption', () => {
  it('should compile line count option', () => {
    const option = { '-n': 1 };
    assert.deepStrictEqual(compileOption(option), {
      askedForBytes: false,
      count: 1
    });
  });

  it('should compile byte count option', () => {
    const option = { '-c': 2 };
    assert.deepStrictEqual(compileOption(option), {
      askedForBytes: true,
      count: 2
    });
  });

  // it('should throw error of illegal line count', () => {
  //   const option = { '-n': 0 };
  //   assert.throws(() => compileOption(option), {
  //     code: 'ILLEGALCOUNT',
  //     message: 'illegal line count -- 0'
  //   });
  // });

  // it('should throw error of illegal byte count', () => {
  //   const option = { '-c': 0 };
  //   assert.throws(() => compileOption(option), {
  //     code: 'ILLEGALCOUNT',
  //     message: 'illegal byte count -- 0'
  //   });
  // });
});
