const assert = require('assert');
const {
  createArgsIterator
} = require('../../../src/utils/parsers/createParser');
const {
  parseCombinedOption,
  parseNonCombinedOption,
  parseNumericOption,
  parseStandAloneOption
} = require('../../../src/utils/parsers/optionParsers.js');

const {
  separateCombinedOption,
  numericOptionValue: headNumericOptionValue
} = require('../../../src/head/headParserConfig.js');

const {
  numericOptionValue: tailNumericOptionValue
} = require('../../../src/tail/tailParserConfig.js');

describe('parseCombinedOption', () => {
  it('should parse combined option', () => {
    const ctx = { separator: separateCombinedOption };
    let argsIterator = createArgsIterator(['-n1']);
    let parsedOption = {
      '-n': '1'
    };
    assert.deepStrictEqual(
      parseCombinedOption.call(ctx, argsIterator),
      parsedOption
    );
    argsIterator = createArgsIterator(['-n-1']);
    parsedOption = {
      '-n': '-1'
    };
    assert.deepStrictEqual(
      parseCombinedOption.call(ctx, argsIterator),
      parsedOption
    );
    argsIterator = createArgsIterator(['-n+1']);
    parsedOption = {
      '-n': '+1'
    };
    assert.deepStrictEqual(
      parseCombinedOption.call(ctx, argsIterator),
      parsedOption
    );
  });
});

describe('parseNonCombinedOption', () => {
  it('should parse non-combined option', () => {
    let argsIterator = createArgsIterator(['-n', '1']);
    let parsedOption = {
      '-n': '1'
    };
    assert.deepStrictEqual(
      parseNonCombinedOption(argsIterator),
      parsedOption
    );
    argsIterator = createArgsIterator(['-n', '-1']);
    parsedOption = {
      '-n': '-1'
    };
    assert.deepStrictEqual(
      parseNonCombinedOption(argsIterator),
      parsedOption
    );
    argsIterator = createArgsIterator(['-n', '+1']);
    parsedOption = {
      '-n': '+1'
    };
    assert.deepStrictEqual(
      parseNonCombinedOption(argsIterator),
      parsedOption
    );
  });
});

describe('parseNumericOption', () => {
  it('should parse numeric option [head]', () => {
    const ctx = { optionName: '-n', separator: headNumericOptionValue };
    const argsIterator = createArgsIterator(['-1']);
    const parsedOption = {
      '-n': '1'
    };
    assert.deepStrictEqual(
      parseNumericOption.call(ctx, argsIterator),
      parsedOption
    );
  });

  it('should parse numeric option [tail]', () => {
    const ctx = { optionName: '-n', separator: tailNumericOptionValue };
    let argsIterator = createArgsIterator(['-1']);
    let parsedOption = {
      '-n': '-1'
    };
    assert.deepStrictEqual(
      parseNumericOption.call(ctx, argsIterator),
      parsedOption
    );
    argsIterator = createArgsIterator(['+1']);
    parsedOption = {
      '-n': '+1'
    };
    assert.deepStrictEqual(
      parseNumericOption.call(ctx, argsIterator),
      parsedOption
    );
  });
});

describe('parseStandAlone', () => {
  it('should parse stand alone option', () => {
    const argsIterator = createArgsIterator(['-g']);
    const parsedOption = {
      '-g': 'true'
    };
    assert.deepStrictEqual(
      parseStandAloneOption(argsIterator),
      parsedOption
    );
  });
});
