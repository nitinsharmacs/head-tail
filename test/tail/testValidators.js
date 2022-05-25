const assert = require('assert');
const {
  validateOption, validateOptionValue
} = require('../../src/tail/validators.js');

describe('validateOption', () => {
  it('should validate invalid option', () => {
    const newOption = { '-j': 1 };
    const prevOptions = {};
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- j',
      showUsage: true,
      prefix: true
    });
  });

  it('should validate -n option if -c is already present', () => {
    const newOption = { '-c': 1 };
    const prevOptions = { '-n': 2 };
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'CANT_COMBINE',
      message: '',
      prefix: false,
      showUsage: true
    });
  });

  it('should throw error if option value is not numeric', () => {
    const newOption = { '-c': '2f' };
    const prevOptions = {};
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'ILLEGAL_OFFSET',
      message: 'illegal offset -- 2f',
      prefix: true
    });
  });

  it('should throw error for repeating options', () => {
    const newOption = { '-n': '2' };
    const prevOptions = { '-n': '1' };
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'REPEATING_OPTION',
      message: '',
      prefix: false,
      showUsage: true
    });
  });
});

describe('validateOptionValue', () => {
  it('should validate legal option value', () => {
    assert.doesNotThrow(() => validateOptionValue({ '-n': 2 }));
    assert.doesNotThrow(() => validateOptionValue({ '-n': '+2' }));
    assert.doesNotThrow(() => validateOptionValue({ '-n': '-2' }));
  });

  it('should throw error if line count is not numeric', () => {
    const option = {
      '-n': 'f'
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'ILLEGAL_OFFSET',
      message: 'illegal offset -- f',
      prefix: true
    });
  });

  it('should throw error if no argument is given to the option', () => {
    const option = {
      '-n': undefined
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'OPTION_REQUIRES_ARG',
      message: 'option requires an argument -- n',
      prefix: true,
      showUsage: true
    });
  });
});
