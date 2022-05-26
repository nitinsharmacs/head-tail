const { createParser } = require('../utils/createParser.js');
const { parserConfig } = require('./headParserConfig.js');

const compileOption = (options) => {
  if (options['-c']) {
    return {
      askedForBytes: true,
      count: +options['-c']
    };
  }
  return {
    askedForBytes: false,
    count: +options['-n']
  };
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const headArgsParser = (args) => {
  const defaults = {
    askedForBytes: false,
    count: 10
  };
  const parser = createParser(parserConfig);
  const { filenames, options } = parser(args);
  return {
    filenames,
    options: isEmpty(options) ? defaults : compileOption(options)
  };
};

exports.compileOption = compileOption;
exports.headArgsParser = headArgsParser;
