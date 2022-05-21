const assert = require('assert');
const {
  validateOption, validateOptionValue
} = require('../src/validators.js');

describe('validateOption', () => {
  it('should validate invalid option', () => {
    const newOption = { '-j': 1 };
    const prevOptions = {};
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- j'
    });
  });

  it('should validate -n option if -c is already present', () => {
    const newOption = { '-c': 1 };
    const prevOptions = { '-n': 2 };
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'CANTCOMBINE',
      message: 'can\'t combine line and byte counts'
    });
  });

  it('should throw error if option value is not numeric', () => {
    const newOption = { '-c': '2f' };
    const prevOptions = {};
    assert.throws(() => validateOption(newOption, prevOptions), {
      code: 'ILLEGALCOUNT',
      message: 'illegal byte count -- 2f'
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
      code: 'ILLEGALCOUNT',
      message: 'illegal byte count -- 0'
    });
  });

  it('should throw error if illegal line count', () => {
    const option = {
      '-n': 0
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'ILLEGALCOUNT',
      message: 'illegal line count -- 0'
    });
  });

  it('should throw error if line count is not numeric', () => {
    const option = {
      '-n': 'f'
    };
    assert.throws(() => validateOptionValue(option), {
      code: 'ILLEGALCOUNT',
      message: 'illegal line count -- f'
    });
  });
});
