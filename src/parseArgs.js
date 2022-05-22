const { validateOption } = require('./validators.js');

const isCombinedOption = (text) => /^-[a-z0-9]{2,}$/.test(text);
const isNonCombinedOption = (text) => /^-[a-z]+$/.test(text);

const createOption = (name, value) => {
  const option = {};
  option[name] = value;
  return option;
};

const separateCombinedOption = (option) => {
  const optionNameRegex = /^(-[a-z0-9])/;
  const [, optionName, optionValue] = option.split(optionNameRegex);
  return createOption(optionName, optionValue);
};

const numericOptionValue = (option) => {
  const [, value] = option.split('-');
  return value;
};

const isNumericOption = (text) => {
  return /^-[0-9]+$/.test(text);
};

const isNotOption = (text) => {
  return !(isCombinedOption(text) ||
    isNonCombinedOption(text) ||
    numericOptionValue(text));
};

const createArgsIterator = (args) => {
  let index = 0;
  const nextArg = function () {
    index++;
    return args[index];
  };
  const currentArg = function () {
    return args[index];
  };
  const hasMoreArgs = function () {
    return args.length > index;
  };
  const restArgs = function () {
    return args.slice(index);
  };
  return {
    nextArg,
    currentArg,
    hasMoreArgs,
    restArgs
  };
};

const parseOption = (argsIterator) => {
  const text = argsIterator.currentArg();
  if (isCombinedOption(text)) {
    argsIterator.nextArg();
    return separateCombinedOption(text);
  }
  if (isNumericOption(text)) {
    argsIterator.nextArg();
    return createOption('-n', numericOptionValue(text));
  }
  const option = createOption(text, argsIterator.nextArg());
  argsIterator.nextArg();
  return option;
};

const parseOptions = (argsIterator) => {
  let options = {};
  while (argsIterator.hasMoreArgs()) {
    const text = argsIterator.currentArg();
    if (isNotOption(text)) {
      return options;
    }
    options = {
      ...options,
      ...validateOption(parseOption(argsIterator), options)
    };
  }
  return options;
};

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

const parseArgs = (args) => {
  const defaults = {
    askedForBytes: false,
    count: 10
  };
  const argsIterator = createArgsIterator(args);
  const options = parseOptions(argsIterator);
  return {
    filenames: argsIterator.restArgs(),
    options: isEmpty(options) ? defaults : compileOption(options)
  };
};

exports.separateCombinedOption = separateCombinedOption;
exports.parseOption = parseOption;
exports.parseOptions = parseOptions;
exports.parseArgs = parseArgs;
exports.compileOption = compileOption;
exports.isCombinedOption = isCombinedOption;
exports.isNonCombinedOption = isNonCombinedOption;
exports.createOption = createOption;
exports.isNotOption = isNotOption;
exports.createArgsIterator = createArgsIterator;
