const { validateOption, validateOptionValue } = require('./validators.js');

const isCombinedOption = (text) => /^-[a-z][0-9]+$/.test(text);
const isNonCombinedOption = (text) => /^-[a-z]+$/.test(text);

const createOption = (name, value) => {
  const option = {};
  option[name] = +value;
  return option;
};

const separateCombinedOption = (option) => {
  const charRegex = /^-[a-z]+/;
  const numRegex = /\d+/;
  const [optionName] = option.match(charRegex);
  const [optionValue] = option.match(numRegex);
  return createOption(optionName, optionValue);
};

const isNotOption = (text) => {
  return !(isCombinedOption(text) || isNonCombinedOption(text));
};

const parseOptions = ([text, ...restArgs], options) => {
  if (isNotOption(text)) {
    return options;
  }
  if (isCombinedOption(text)) {
    return parseOptions(restArgs, {
      ...options,
      ...validateOption(separateCombinedOption(text), options)
    });
  }
  const [optionValue] = restArgs;
  return parseOptions(restArgs.slice(1), {
    ...options,
    ...validateOption(createOption(text, optionValue), options)
  });
};

const parseFileNames = (args) => {
  if (args.length === 0) {
    return [];
  }
  const [text] = args;
  if (isCombinedOption(text)) {
    return parseFileNames(args.slice(1));
  }
  if (isNonCombinedOption(text)) {
    return parseFileNames(args.slice(2));
  }
  return args;
};

const compileOption = (options) => {
  validateOptionValue(options);
  const defaultCount = 10;
  if (options['-c']) {
    return {
      askedForBytes: true,
      count: options['-c']
    };
  }
  return {
    askedForBytes: false,
    count: options['-n'] || defaultCount
  };
};

const parseArgs = (args) => {
  return {
    filenames: parseFileNames(args),
    options: parseOptions(args, {})
  };
};

exports.parseOptions = parseOptions;
exports.parseFileNames = parseFileNames;
exports.parseArgs = parseArgs;
exports.compileOption = compileOption;
