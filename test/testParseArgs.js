const assert = require('assert');
const { parseOptions } = require('../src/parseArgs.js');

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
