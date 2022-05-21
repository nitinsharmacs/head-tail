const { validateOption } = require('./validators.js');

const isCombinedOption = (text) => /^-[a-z0-9]{2,}$/.test(text);
const isNonCombinedOption = (text) => /^-[a-z0-9]+$/.test(text);

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
  const options = parseOptions(args, {});
  return {
    filenames: parseFileNames(args),
    options: isEmpty(options) ? defaults : compileOption(options)
  };
};

exports.separateCombinedOption = separateCombinedOption;
exports.parseOptions = parseOptions;
exports.parseFileNames = parseFileNames;
exports.parseArgs = parseArgs;
exports.compileOption = compileOption;
