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
  const defaults = {
    askedForBytes: false,
    relativeToBeginning: false,
    supressHeadings: false,
    count: 10
  };

  if (hasKey(options, '-c')) {
    const optionValue = options['-c'];
    return {
      askedForBytes: true,
      relativeToBeginning: isRelativeToBeginning(optionValue),
      supressHeadings: hasKey(options, '-q'),
      count: Math.abs(+options['-c'])
    };
  }
  if (hasKey(options, '-n')) {
    const optionValue = options['-n'];
    return {
      askedForBytes: false,
      relativeToBeginning: isRelativeToBeginning(optionValue),
      supressHeadings: hasKey(options, '-q'),
      count: Math.abs(+options['-n'])
    };
  }
  if (hasKey(options, '-q')) {
    return {
      ...defaults,
      supressHeadings: true
    };
  }
  return defaults;
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const tailArgsParser = (args) => {
  const parser = createParser(parserConfig);
  const { filenames, options } = parser(args);
  return {
    filenames,
    options: compileOptions(options)
  };
};

exports.compileOptions = compileOptions;
exports.tailArgsParser = tailArgsParser;
