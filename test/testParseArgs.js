const assert = require('assert');
const { parseOption,
  parseOptions,
  parseArgs,
  compileOption,
  separateCombinedOption,
  isCombinedOption,
  isNonCombinedOption,
  createOption,
  isNotOption,
  createArgsIterator } = require('../src/parseArgs.js');

describe('isCombinedOption', () => {
  it('should check if option is of combined type', () => {
    assert.ok(isCombinedOption('-n1'));
  });

  it('should check if option is not of combined type', () => {
    assert.strictEqual(isCombinedOption('-n'), false);
  });
});

describe('isNonCombinedOption', () => {
  it('should check if option is of non-combined type', () => {
    assert.ok(isNonCombinedOption('-n'));
  });

  it('should check if option is not of non-combined type', () => {
    assert.strictEqual(isNonCombinedOption('-n1'), false);
  });
});

describe('separateCombinedOption', () => {
  it('should separate option having numerical value', () => {
    assert.deepStrictEqual(separateCombinedOption('-c1'), { '-c': '1' });
  });

  it('should separate option having alphanumerical value', () => {
    assert.deepStrictEqual(separateCombinedOption('-cd1'), { '-c': 'd1' });
  });
});

describe('createOption', () => {
  it('should create option of given name and value', () => {
    assert.deepStrictEqual(createOption('-n', '1'), { '-n': '1' });
  });
});

describe('isNotOption', () => {
  it('should check if text is not option', () => {
    assert.ok(isNotOption('filename'));
  });

  it('should check if text is not option if it is option', () => {
    assert.strictEqual(isNotOption('-n'), false);
  });
});

describe('parseOption', () => {
  it('should parse non-combined option', () => {
    const argsIterator = createArgsIterator(['-n', '4']);
    assert.deepStrictEqual(parseOption(argsIterator), {
      '-n': '4',
    });
  });

  it('should parse combined option', () => {
    const argsIterator = createArgsIterator(['-n4']);
    assert.deepStrictEqual(parseOption(argsIterator), {
      '-n': '4',
    });
  });
});

describe('parseOptions', () => {
  it('should parse options separated by their values', () => {
    let argsIterator = createArgsIterator(['-n', '4', 'filename']);
    assert.deepStrictEqual(parseOptions(argsIterator), {
      '-n': '4',
    });
    argsIterator = createArgsIterator(['-c', '3', 'filename']);
    assert.deepStrictEqual(parseOptions(argsIterator), {
      '-c': '3',
    });
  });

  it('should not parse options coming after filename', () => {
    const argsIterator = createArgsIterator(['filename', '-c', '3']);
    assert.deepStrictEqual(parseOptions(argsIterator), {});
  });

  it('should parse combined options', () => {
    const argsIterator = createArgsIterator(['-c2', 'filename']);
    assert.deepStrictEqual(parseOptions(argsIterator), {
      '-c': '2'
    });
  });

  it('should parse options when filenames come at first', () => {
    const argsIterator = createArgsIterator(['filename',
      'filename2',
      '-n',
      '1',
      '-c1']);
    assert.deepStrictEqual(parseOptions(argsIterator), {
    });
  });

  it('should throw error for invalid option', () => {
    const argsIterator = createArgsIterator(['-l1', '-c', '2']);
    assert.throws(() => parseOptions(argsIterator), {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- l'
    });
  });

  it('should throw error for invalid option value', () => {
    const argsIterator = createArgsIterator(['-csd']);
    assert.throws(() => parseOptions(argsIterator), {
      code: 'ILLEGALCOUNT',
      message: 'illegal byte count -- sd'
    });
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
});
