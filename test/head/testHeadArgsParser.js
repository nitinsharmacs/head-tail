const assert = require('assert');
const { headArgsParser,
  compileOption } = require('../../src/head/headArgsParser.js');

describe('headArgsParser', () => {
  it('should parse combined options and filenames', () => {
    const args = ['-n1', 'filename', 'filename2'];
    assert.deepStrictEqual(headArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        count: 1
      }
    });
  });

  it('should parse separated options and filenames', () => {
    const args = ['-n', '1', 'filename', 'filename2'];
    assert.deepStrictEqual(headArgsParser(args), {
      filenames: ['filename', 'filename2'],
      options: {
        askedForBytes: false,
        count: 1
      }
    });
  });

  it('should parse when filenames comes at first', () => {
    const args = ['filename', 'filename2', '-n', '1', '-c1'];
    assert.deepStrictEqual(headArgsParser(args), {
      filenames: ['filename', 'filename2', '-n', '1', '-c1'],
      options: {
        askedForBytes: false,
        count: 10
      }
    });
  });

  it('should throw error for invalid option value', () => {
    const args = ['-n-1', 'filename'];
    assert.throws(() => headArgsParser(args), {
      code: 'ILLEGAL_COUNT',
      message: 'illegal line count -- -1',
      prefixWithHead: true
    });
  });

  it('should throw error for illegal option', () => {
    const args = ['-g', '1', 'filename'];
    assert.throws(() => headArgsParser(args), {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- g',
      showUsage: true,
      prefixWithHead: true
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
