const assert = require('assert');
const { compileOptions } = require('../../src/tail/tailArgsParser.js');

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
