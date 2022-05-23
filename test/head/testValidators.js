const assert = require('assert');
const {
  validateOption, validateOptionValue
} = require('../../src/head/validators.js');

describe('validateOption', () => {
  it('should validate invalid option', () => {
    const newOption = { '-j': 1 };
    const prevOptions = {};
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- j',
      showUsage: true,
      prefixWithHead: true
    });
  });

  it('should validate -n option if -c is already present', () => {
    const newOption = { '-c': 1 };
    const prevOptions = { '-n': 2 };
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'CANT_COMBINE',
      message: 'can\'t combine line and byte counts',
      prefixWithHead: true
    });
  });

  it('should throw error if option value is not numeric', () => {
    const newOption = { '-c': '2f' };
    const prevOptions = {};
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'ILLEGAL_COUNT',
      message: 'illegal byte count -- 2f',
      prefixWithHead: true
    });
  });
});

describe('validateOptionValue', () => {
  it('should validate legal option value', () => {
    const option = {
      '-n': 2
    };
    assert.doesNotThrow(() => validateOptionValue(option));
  });

  it('should throw error if illegal byte count', () => {
    const option = {
      '-c': 0
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'ILLEGAL_COUNT',
      message: 'illegal byte count -- 0',
      prefixWithHead: true
    });
  });

  it('should throw error if illegal line count', () => {
    const option = {
      '-n': 0
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'ILLEGAL_COUNT',
      message: 'illegal line count -- 0',
      prefixWithHead: true
    });
  });

  it('should throw error if line count is not numeric', () => {
    const option = {
      '-n': 'f'
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'ILLEGAL_COUNT',
      message: 'illegal line count -- f',
      prefixWithHead: true
    });
  });

  it('should throw error if no argument is given to the option', () => {
    const option = {
      '-n': undefined
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'OPTION_REQUIRES_ARG',
      message: 'option requires an argument -- n',
      prefixWithHead: true
    });
  });
});
