const { parserConfig } = require('./tailParserConfig.js');
const { createParser } = require('../utils/parsers/createParser.js');

const hasKey = (obj, key) => {
  const keys = Object.keys(obj);
  return keys.includes(key);
};

const isRelativeToBeginning = (optionValue) => {
  return optionValue.startsWith('+');
};

const compileOptions = (options) => {
  if (hasKey(options, '-c')) {
    const optionValue = options['-c'];
    return {
      askedForBytes: true,
      relativeToBeginning: isRelativeToBeginning(optionValue),
      count: Math.abs(+options['-c'])
    };
  }
  const optionValue = options['-n'];
  return {
    askedForBytes: false,
    relativeToBeginning: isRelativeToBeginning(optionValue),
    count: Math.abs(+options['-n'])
  };
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const tailArgsParser = (args) => {
  const defaults = {
    askedForBytes: false,
    relativeToBeginning: false,
    count: 10
  };
  const parser = createParser(parserConfig);
  const { filenames, options } = parser(args);
  return {
    filenames,
    options: isEmpty(options) ? defaults : compileOptions(options)
  };
};

exports.compileOptions = compileOptions;
exports.tailArgsParser = tailArgsParser;
