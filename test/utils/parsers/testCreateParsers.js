const assert = require('assert');
const {
  parserConfig: headConfig
} = require('../../../src/head/headParserConfig.js');
const {
  parserConfig: tailConfig
} = require('../../../src/tail/tailParserConfig.js');
const {
  createArgsIterator,
  parseOption,
  parseOptions,
  parseArgs
} = require('../../../src/utils/parsers/createParser.js');

describe('parseOption [head]', () => {
  it('should parse combined option', () => {
    let argsIterator = createArgsIterator(['-n1']);
    let parsedOption = { '-n': '1' };
    assert.deepStrictEqual(parseOption(argsIterator, headConfig), parsedOption);

    argsIterator = createArgsIterator(['-n-1']);
    parsedOption = { '-n': '-1' };
    assert.deepStrictEqual(parseOption(argsIterator, headConfig), parsedOption);

    argsIterator = createArgsIterator(['-n+1']);
    parsedOption = { '-n': '+1' };
    assert.deepStrictEqual(parseOption(argsIterator, headConfig), parsedOption);
  });

  it('should parse non-combined option', () => {
    let argsIterator = createArgsIterator(['-n', '1']);
    let parsedOption = { '-n': '1' };
    assert.deepStrictEqual(parseOption(argsIterator, headConfig), parsedOption);

    argsIterator = createArgsIterator(['-n', '-1']);
    parsedOption = { '-n': '-1' };
    assert.deepStrictEqual(parseOption(argsIterator, headConfig), parsedOption);

    argsIterator = createArgsIterator(['-n', '+1']);
    parsedOption = { '-n': '+1' };
    assert.deepStrictEqual(parseOption(argsIterator, headConfig), parsedOption);
  });

  it('should parse numeric option', () => {
    const argsIterator = createArgsIterator(['-1']);
    const parsedOption = { '-n': '1' };
    assert.deepStrictEqual(parseOption(argsIterator, headConfig), parsedOption);
  });
});

describe('parseOption [tail]', () => {
  it('should parse combined option', () => {
    let argsIterator = createArgsIterator(['-n1']);
    let parsedOption = { '-n': '1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n-1']);
    parsedOption = { '-n': '-1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n+1']);
    parsedOption = { '-n': '+1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);
  });

  it('should parse non-combined option', () => {
    let argsIterator = createArgsIterator(['-n', '1']);
    let parsedOption = { '-n': '1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n', '-1']);
    parsedOption = { '-n': '-1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n', '+1']);
    parsedOption = { '-n': '+1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);
  });

  it('should parse numeric option', () => {
    let argsIterator = createArgsIterator(['-1']);
    let parsedOption = { '-n': '-1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['+1']);
    parsedOption = { '-n': '+1' };
    assert.deepStrictEqual(parseOption(argsIterator, tailConfig), parsedOption);
  });
});

describe('parseOptions [head]', () => {
  it('should parse combined option', () => {
    const argsIterator = createArgsIterator(['-n1']);
    const parsedOption = { '-n': '1' };
    assert.deepStrictEqual(
      parseOptions(argsIterator, headConfig), parsedOption);
  });

  it('should throw error for invalid option value [combined]', () => {
    const argsIterator = createArgsIterator(['-n-1']);
    assert.throws(
      () => parseOptions(argsIterator, headConfig));
  });

  it('should throw error for invalid option value [non-combined]', () => {
    const argsIterator = createArgsIterator(['-n', 'a']);
    assert.throws(
      () => parseOptions(argsIterator, tailConfig));
  });

  it('should throw error for illegal option', () => {
    const argsIterator = createArgsIterator(['-g', 'a']);
    assert.throws(
      () => parseOptions(argsIterator, tailConfig));
  });

});

describe('parseOptions [tail]', () => {
  it('should parse combined option', () => {
    let argsIterator = createArgsIterator(['-n1']);
    let parsedOption = { '-n': '1' };
    assert.deepStrictEqual(
      parseOptions(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n-1']);
    parsedOption = { '-n': '-1' };
    assert.deepStrictEqual(
      parseOptions(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n+1']);
    parsedOption = { '-n': '+1' };
    assert.deepStrictEqual(
      parseOptions(argsIterator, tailConfig), parsedOption);
  });

  it('should parse non-combined option', () => {
    let argsIterator = createArgsIterator(['-n', '1']);
    let parsedOption = { '-n': '1' };
    assert.deepStrictEqual(
      parseOptions(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n', '-1']);
    parsedOption = { '-n': '-1' };
    assert.deepStrictEqual(
      parseOptions(argsIterator, tailConfig), parsedOption);

    argsIterator = createArgsIterator(['-n', '+1']);
    parsedOption = { '-n': '+1' };
    assert.deepStrictEqual(
      parseOptions(argsIterator, tailConfig), parsedOption);
  });

  it('should throw error for invalid option value [combined]', () => {
    const argsIterator = createArgsIterator(['-na']);
    assert.throws(
      () => parseOptions(argsIterator, tailConfig));
  });

  it('should throw error for invalid option value [non-combined]', () => {
    const argsIterator = createArgsIterator(['-n', 'a']);
    assert.throws(
      () => parseOptions(argsIterator, tailConfig));
  });

  it('should throw error for illegal option', () => {
    const argsIterator = createArgsIterator(['-g', 'a']);
    assert.throws(
      () => parseOptions(argsIterator, tailConfig));
  });
});

describe('parseArgs [head]', () => {
  const ctx = { config: headConfig };
  it('should parse combined option and files', () => {
    const args = ['-n1', 'file'];
    const parsedArgs = { options: { '-n': '1' }, filenames: ['file'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);
  });

  it('should parse non-combined option and files', () => {
    const args = ['-n', '1', 'file', 'file2'];
    const parsedArgs = { options: { '-n': '1' }, filenames: ['file', 'file2'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);
  });
});

describe('parseArgs [tail]', () => {
  const ctx = { config: tailConfig };
  it('should parse combined option and files', () => {
    let args = ['-n1', 'file'];
    let parsedArgs = { options: { '-n': '1' }, filenames: ['file'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);

    args = ['-n-1', 'file'];
    parsedArgs = { options: { '-n': '-1' }, filenames: ['file'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);

    args = ['-n+1', 'file'];
    parsedArgs = { options: { '-n': '+1' }, filenames: ['file'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);
  });

  it('should parse non-combined option and files', () => {
    let args = ['-n', '1', 'file', 'file2'];
    let parsedArgs = { options: { '-n': '1' }, filenames: ['file', 'file2'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);

    args = ['-n', '-1', 'file', 'file2'];
    parsedArgs = { options: { '-n': '-1' }, filenames: ['file', 'file2'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);

    args = ['-n', '+1', 'file', 'file2'];
    parsedArgs = { options: { '-n': '+1' }, filenames: ['file', 'file2'] };
    assert.deepStrictEqual(
      parseArgs.call(ctx, args), parsedArgs);
  });
});
