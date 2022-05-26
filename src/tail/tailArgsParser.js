const { parserConfig } = require('./tailParserConfig.js');
const { createParser } = require('../utils/createParser.js');

const hasKey = (obj, key) => {
  const keys = Object.keys(obj);
  return keys.includes(key);
};

const isRelativeToBeginning = (optionValue) => {
  return optionValue.startsWith('+');
};

const compileCOption = (compiledOptions, options) => {
  const optionValue = options['-c'];
  return {
    ...compiledOptions,
    askedForBytes: true,
    relativeToBeginning: isRelativeToBeginning(optionValue),
    count: Math.abs(+options['-c'])
  };
};

const compileNOption = (compiledOptions, options) => {
  const optionValue = options['-n'];
  return {
    ...compiledOptions,
    askedForBytes: false,
    relativeToBeginning: isRelativeToBeginning(optionValue),
    count: Math.abs(+options['-n'])
  };
};

const compileQOption = (compiledOptions) => {
  return {
    ...compiledOptions,
    supressHeadings: true
  };
};

const compileOptions = (options) => {
  let compiledOptions = {
    askedForBytes: false,
    relativeToBeginning: false,
    supressHeadings: false,
    count: 10
  };
  const availableOptions = [
    {
      name: '-c',
      compiler: compileCOption
    },
    {
      name: '-n',
      compiler: compileNOption
    },
    {
      name: '-q',
      compiler: compileQOption
    },
  ];
  for (const option of availableOptions) {
    if (hasKey(options, option.name)) {
      compiledOptions = option.compiler(compiledOptions, options);
    }
  }
  return compiledOptions;
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
