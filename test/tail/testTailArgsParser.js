const assert = require('assert');
const { compileOptions,
  tailArgsParser } = require('../../src/tail/tailArgsParser.js');

describe('compileOptions', () => {
  it('should compile line count from last', () => {
    let options = {
      '-n': '1'
    };
    let compiled = {
      askedForBytes: false,
      relativeToBeginning: false,
      count: 1
    };
    assert.deepStrictEqual(compileOptions(options), compiled);
    options = {
      '-n': '-1'
    };
    compiled = {
      askedForBytes: false,
      relativeToBeginning: false,
      count: 1
    };
    assert.deepStrictEqual(compileOptions(options), compiled);
    options = {
      '-n': '0'
    };
    compiled = {
      askedForBytes: false,
      relativeToBeginning: false,
      count: 0
    };
    assert.deepStrictEqual(compileOptions(options), compiled);
  });

  it('should compile byte count from last', () => {
    let options = {
      '-c': '1'
    };
    let compiled = {
      askedForBytes: true,
      relativeToBeginning: false,
      count: 1
    };
    assert.deepStrictEqual(compileOptions(options), compiled);
    options = {
      '-c': '-1'
    };
    compiled = {
      askedForBytes: true,
      relativeToBeginning: false,
      count: 1
    };
    assert.deepStrictEqual(compileOptions(options), compiled);
  });

  it('should compile line count with reference to beginning', () => {
    const options = {
      '-n': '+1'
    };
    const compiled = {
      askedForBytes: false,
      relativeToBeginning: true,
      count: 1
    };
    assert.deepStrictEqual(compileOptions(options), compiled);
  });

  it('should compile byte count with reference to beginning', () => {
    const options = {
      '-c': '+1'
    };
    const compiled = {
      askedForBytes: true,
      relativeToBeginning: true,
      count: 1
    };
    assert.deepStrictEqual(compileOptions(options), compiled);
  });
});

describe('tailArgsParser', () => {
  it('should parse combined options and filenames', () => {
    let args = ['-n1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: false,
        count: 1
      }
    });
    args = ['-n-1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: false,
        count: 1
      }
    });
    args = ['-n+1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: true,
        count: 1
      }
    });
  });

  it('should parse numerical options and filenames', () => {
    let args = ['-1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: false,
        count: 1
      }
    });
    args = ['+1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: true,
        count: 1
      }
    });
  });

  it('should parse separated options and filenames', () => {
    let args = ['-n', '1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: false,
        count: 1
      }
    });
    args = ['-n', '-1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: false,
        count: 1
      }
    });
    args = ['-n', '+1', 'filename', 'filename2'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        relativeToBeginning: true,
        count: 1
      }
    });
  });

  it('should parse when filenames comes at first', () => {
    const args = ['filename', 'filename2', '-n', '+1', '-c1'];
    assert.deepStrictEqual(tailArgsParser(args), {
      filenames: ['filename', 'filename2', '-n', '+1', '-c1'],
      options: {
        askedForBytes: false,
        relativeToBeginning: false,
        count: 10
      }
    });
  });

  it('should throw error for invalid option value', () => {
    const args = ['-nb', 'filename'];
    assert.throws(() => tailArgsParser(args), {
      code: 'ILLEGAL_OFFSET',
      message: 'illegal offset -- b',
      prefix: true
    });
  });

  it('should throw error for illegal option', () => {
    const args = ['-g', '1', 'filename'];
    assert.throws(() => tailArgsParser(args), {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- g',
      showUsage: true,
      prefix: true
    });
  });
});
