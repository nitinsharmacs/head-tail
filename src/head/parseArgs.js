const isCombinedOption = (text) => {
  const rule = /^-[a-z0-9]{2,}|-[a-z]+[-+][0-9]+$/;
  return rule.test(text);
};

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
  if (isNumericOption(text)) {
    argsIterator.nextArg();
    return createOption('-n', numericOptionValue(text));
  }
  if (isCombinedOption(text)) {
    argsIterator.nextArg();
    return separateCombinedOption(text);
  }
  const option = createOption(text, argsIterator.nextArg());
  argsIterator.nextArg();
  return option;
};

const parseOptions = (argsIterator, validator) => {
  let options = {};
  while (argsIterator.hasMoreArgs()) {
    const text = argsIterator.currentArg();
    if (isNotOption(text)) {
      return options;
    }
    options = {
      ...options,
      ...validator(parseOption(argsIterator), options)
    };
  }
  return options;
};

const parseArgs = (args, validator) => {
  const argsIterator = createArgsIterator(args);
  const options = parseOptions(argsIterator, validator);
  return {
    filenames: argsIterator.restArgs(),
    options: options
  };
};

exports.separateCombinedOption = separateCombinedOption;
exports.parseOption = parseOption;
exports.parseOptions = parseOptions;
exports.parseArgs = parseArgs;
exports.isCombinedOption = isCombinedOption;
exports.isNonCombinedOption = isNonCombinedOption;
exports.createOption = createOption;
exports.isNotOption = isNotOption;
exports.createArgsIterator = createArgsIterator;
